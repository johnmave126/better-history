class BH.Views.WeekView extends BH.Views.ViewWithSearch
  className: 'week_view with_controls'
  template: BH.Templates['week']

  events:
    'click .delete_all': 'clickedDeleteAll'

  initialize: ->
    super()
    @history = @options.history
    @history.bind('change', @onHistoryLoaded, @)

  render: ->
    properties = _.extend @getI18nValues(), @model.toTemplate()
    @$el.html(@renderTemplate properties)
    @

  pageTitle: ->
    @model.toTemplate().title

  onHistoryLoaded: ->
    @renderHistory()

  renderHistory: ->
    history = @history.toTemplate()
    for day in history.days
      container = @$("[data-day=#{day.day}]")
      container.find(".label .count").html @t('number_of_visits', [day.count])
      container.find('.bar').css width: day.percentage

    @$('.controls .count').html @t('number_of_visits', [history.total])
    @assignTabIndices('.day a')
    @$el.addClass('loaded')

  clickedDeleteAll: (ev) ->
    if $(ev.target).parent().attr('disabled') != 'disabled'
      ev.preventDefault()
      @promptView = BH.Views.CreatePrompt(chrome.i18n.getMessage('confirm_delete_all_visits', [@model.toTemplate().title]))
      @promptView.open()
      @promptView.model.on('change', @deleteAction, @)

  deleteAction: (prompt) ->
    if prompt.get('action')
      @promptView.spin()
      @history.destroy()
      @promptView.close()
      @history.fetch()
    else
      @promptView.close()

  getI18nValues: ->
    @i18nFetcher.get [
      'delete_all_visits_for_filter_button',
      'no_visits_found',
      'search_input_placeholder_text'
    ]
