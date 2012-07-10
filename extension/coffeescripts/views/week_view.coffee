class BH.Views.WeekView extends BH.Views.ViewWithSearch
  className: 'week_view with_controls'
  template: BH.Templates['week']

  events:
    'click .delete_all': 'clickedDeleteAll'

  initialize: ->
    super()
    @dayViews = {}
    @model.bind('change:percentages', @updatePercentages, @)
    @model.bind('change:count', @updateWeekStats, @)

    @model.get('days').each (model) =>
      model.bind('change:count', @updateDay, @)

  selectDay: (id) ->
    @dayViews[id].select().renderHistory()

  render: (type) ->
    @$el.html(@renderTemplate(_.extend(@getI18nValues(), @model.toTemplate())))

    @model.get('days').each (model) =>
      @dayViews[model.id] = view = new BH.Views.DayView
        model: model,
        weekModel: @model
      $('.mainview').append(view.render().el)
    @

  pageTitle: ->
    @model.get('title')

  updateDay: (model) ->
    $('.number_of_visits', @_getDayElement(model.id)).text(model.get('count'))

  updateWeekStats: (model) ->
    @$('.number_of_visits_all_week').text(model.get('count'))

  updatePercentages: (percentages) ->
    @model.get('days').each (model, i) =>
      percentage = @model.get('percentages')[i] + '%'
      $('.bar', @_getDayElement(model.id)).css({width: percentage})

  clickedDeleteAll: (ev) ->
    if $(ev.target).parent().attr('disabled') != 'disabled'
      ev.preventDefault()
      @promptView = BH.Views.CreatePrompt(chrome.i18n.getMessage('confirm_delete_all_visits', [@model.get('title')]))
      @promptView.open()
      @promptView.model.on('change', @deleteAction, @)

  deleteAction: (prompt) ->
    if prompt.get('action')
      if @model.get('days')
        @promptView.spin()
        @model.clear()
        @promptView.close()
        @model.fetch()
    else
      @promptView.close()

  _getDayElement: (id) ->
    @$("[data-id=#{id}]")

  getI18nValues: ->
    @i18nFetcher.get([
      'delete_all_visits_for_filter_button',
      'no_visits_found',
      'search_input_placeholder_text'
    ])
