class BH.Views.SearchView extends BH.Views.ViewWithSearch
  className: 'search_view with_controls'
  template: BH.Templates['search']

  events:
    'click .delete_all': 'clickedDeleteAll'

  initialize: ->
    @model.on('change:history', @renderVisits, @)
    @model.on('change:query', @updateQueryReferences, @)
    super()

  render: ->
    @$el.append(@renderTemplate(_.extend(@getI18nValues(), @model.toTemplate())))
    @

  pageTitle: ->
    "Searching"

  updateQueryReferences: ->
    @$('.title').text(@model.get('title'))
    @$('.search').val(@model.get('query'))
    @$('.content').html('')
    @model.fetch()

  renderVisits: ->
    @$el.addClass('loaded')
    @collection = @model.get('history')

    @$('.search').focus()
    contentElement = @$el.children('.content')

    if @collection.length == 100
      key = 'max_number_of_search_results'
    else
      key = 'number_of_search_results'

    @$('.number_of_results').text(chrome.i18n.getMessage(key, [@collection.length]))


    new BH.Views.SearchResultsView(
      model: @model
      collection: @collection
      el: contentElement
    ).render()

    if @collection.length == 0
      @$('.delete_all').attr('disabled', 'disabled')
    else
      @$('.delete_all').removeAttr('disabled')

    @tabIndex($(contentElement).find('a'))

  clickedDeleteAll: (ev) ->
    ev.preventDefault()
    if $(ev.target).parent().attr('disabled') != 'disabled'
      @promptView = BH.Views.CreatePrompt(chrome.i18n.getMessage('confirm_delete_all_search_results'))
      @promptView.open()
      @promptView.model.on('change', @deleteAction, @)

  deleteAction: (prompt) ->
    if prompt.get('action')
      @promptView.spin()
      @collection.destroyAll()
      @model.fetch
        success: (model) =>
          model.trigger('change:history') # make sure
          @promptView.close()
    else
      @promptView.close()

  getI18nValues: ->
    @i18nFetcher.get([
      'search_time_frame',
      'search_input_placeholder_text',
      'delete_all_visits_for_search_button',
      'no_visits_found'
    ])
