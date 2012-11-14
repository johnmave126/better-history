class BH.Views.SearchView extends Backbone.View
  @include BH.Modules.chromeSupport
  @include BH.Modules.searchSupport
  @include BH.Modules.tabIndexSupport
  @include BH.Modules.topLevelSupport

  className: 'search_view with_controls'
  template: BH.Templates['search']

  events:
    'click .delete_all': 'clickedDeleteAll'

  initialize: ->
    @history = @options.history
    @history.on('change', @onSearchHistoryChanged, @)
    @model.on('change:query', @onQueryChanged, @)
    super()

  render: ->
    properties = _.extend(@getI18nValues(), @model.toTemplate())
    html = Mustache.to_html @template, properties
    @$el.append html
    @

  pageTitle: ->
    "Searching"

  onSearchHistoryChanged: ->
    @renderVisits()
    @updateDeleteButton()

  onQueryChanged: ->
    @updateQueryReferences()
    @history.set {query: @model.get('query')}, silent: true

  updateQueryReferences: ->
    properties = @model.toTemplate()
    @$el.removeClass('loaded')
    @$('.title').text properties.title
    @$('.search').val properties.query
    @$('.content').html('')

  renderVisits: ->
    @$el.addClass('loaded')

    @$('.search').focus()
    contentElement = @$el.children('.content')

    if @history.get('history').length == 100
      key = 'max_number_of_search_results'
    else
      key = 'number_of_search_results'

    @$('.number_of_results').text(chrome.i18n.getMessage(key, [@history.get('history').length]))


    new BH.Views.SearchResultsView(
      model: @history
      el: contentElement
    ).render()

  updateDeleteButton: ->
    deleteButton = @$('.delete_all')
    if @history.isEmpty()
      deleteButton.attr('disabled', 'disabled')
    else
      deleteButton.removeAttr('disabled')

  clickedDeleteAll: (ev) ->
    ev.preventDefault()
    if $(ev.target).parent().attr('disabled') != 'disabled'
      @promptView = BH.Views.CreatePrompt(chrome.i18n.getMessage('confirm_delete_all_search_results'))
      @promptView.open()
      @promptView.model.on('change', @deleteAction, @)

  deleteAction: (prompt) ->
    if prompt.get('action')
      @collection.destroyAll()
      @model.fetch
        success: (model) =>
          model.trigger('change:history') # make sure
          @promptView.close()
    else
      @promptView.close()

  getI18nValues: ->
    @t [
      'search_time_frame',
      'search_input_placeholder_text',
      'delete_all_visits_for_search_button',
      'no_visits_found'
    ]
