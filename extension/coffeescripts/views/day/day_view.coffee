class BH.Views.DayView extends BH.Views.ViewWithSearch
  className: 'day_view with_controls'
  template: BH.Templates['day']

  events:
    'click .delete_day': 'clickedDeleteAll'
    'click .back_to_week': 'backToWeekClicked'

  initialize: ->
    super()
    @history = @options.history
    @history.bind('change', @onDayHistoryLoaded, @)

  render: ->
    properties = _.extend @getI18nValues(), @model.toTemplate()
    @$el.html(@renderTemplate properties)
    @

  pageTitle: ->
    @model.toTemplate().formalDate

  onDayHistoryLoaded: ->
    @renderHistory()
    @updateDeleteButton()

  renderHistory: ->
    @dayResultsView = new BH.Views.DayResultsView
      model: @history
    @$('.content').html @dayResultsView.render().el

  updateDeleteButton: ->
    deleteButton = @$('.button')
    if @history.isEmpty()
      deleteButton.attr('disabled', 'disabled')
    else
      deleteButton.removeAttr('disabled')

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
        @history.destroy()
        @history.fetch
          success: =>
            @promptView.close()
    else
      @promptView.close()

  backToWeekClicked: (ev) ->
    @$('.content').html('')

  getI18nValues: ->
    properties = @i18nFetcher.get [
      'collapse_button',
      'expand_button',
      'delete_all_visits_for_filter_button',
      'no_visits_found',
      'search_input_placeholder_text',
    ]
    properties[@i18nFetcher.scopeKey('back_to_week_link')] = chrome.i18n.getMessage('back_to_week_link', [
      chrome.i18n.getMessage('back_arrow')
    ])
    properties
