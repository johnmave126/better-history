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

  render: (type) ->
    @$el.html(@template(_.extend(i18n.day(), @model.toTemplate())))
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
      Helpers.tabIndex($('.content a', @el))
      @$('button').attr('disabled', null)


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
