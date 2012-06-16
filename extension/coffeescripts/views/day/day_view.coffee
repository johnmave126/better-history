class BH.Views.DayView extends BH.Views.Modal
  className: 'day_view'
  templateId: 'day'

  events:
    'click .delete_all': 'clickedDeleteAll'
    'keyup .search': 'filtered'
    'click .full_search': 'fullSearchClicked'

  initialize: (config) ->
    @attachGeneralEvents()
    @model.on('change:history', @renderHistory, @)
    @on('close', @updateUrl, @)

  render: (type) ->
    @$el.html(@template(_.extend(@getI18nValues(), @model.toTemplate())))
    @$('button').attr('disabled', 'disabled')
    @

  renderHistory: ->
    @collection = @model.get('history')

    @$('.search').focus()
    contentElement = @$('.content')

    new BH.Views.DayResultsView(
      collection: @model.get('history')
      model: @model
      el: contentElement
    ).render()

    if @collection.length == 0 || @model.get('filter')
      @$('button').attr('disabled', 'disabled')
    else
      @tabIndex($('.content a', @el))
      @$('button').attr('disabled', null)

  updateUrl: ->
    router.navigate(BH.Lib.Url.week(@options.weekModel.id))

  clickedDeleteAll: (ev) ->
    if $(ev.target).parent().attr('disabled') != 'disabled'
      ev.preventDefault()
      @promptView = BH.Views.CreatePrompt(chrome.i18n.getMessage('confirm_delete_all_visits', [@model.toJSON().formalDate]))
      @promptView.open()
      @promptView.model.on('change', @deleteAction, @)

  deleteAction: (prompt) ->
    if prompt.get('action')
      if @collection
        @promptView.spin()
        @model.clear()
        @promptView.close()
    else
      @promptView.close()

  filtered: (ev) ->
    @model.set({filter: $(ev.currentTarget).val()})
    @model.fetch()

  fullSearchClicked: ->
    @close()

  getI18nValues: ->
    @i18nFetcher.get [
      'collapse_button',
      'expand_button',
      'delete_all_visits_for_filter_button',
      'no_visits_found',
      'search_input_placeholder_text'
    ]
