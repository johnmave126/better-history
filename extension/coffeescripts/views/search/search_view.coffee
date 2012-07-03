class BH.Views.SearchView extends BH.Views.ViewWithSearch
  className: 'search_view'
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

  updateQueryReferences: ->
    @$('.title').text(@model.get('title'))
    @$('.search').val(@model.get('query'))
    @$('.content').html('')
    @model.fetch()

  renderVisits: ->
    @collection = @model.get('history')

    @$('.search').focus()
    contentElement = @$el.children('.content')
    @$('.number_of_results').text(chrome.i18n.getMessage('number_of_search_results', [@collection.length]))

    new BH.Views.SearchResultsView(
      collection: @collection
      el: contentElement
    ).render()

    disabled = if @collection.length == 0 then 'disabled' else null
    @$('.delete_all').attr('disabled', disabled)

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
