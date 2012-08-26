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

  render: ->
    @$el.html(@renderTemplate(_.extend(@getI18nValues(), @model.toTemplate())))

    # If any day has been preloaded, update the day stats
    @model.get('days').each (model) =>
      @updateDay model if model.get('count') != 0
    @

  pageTitle: ->
    @model.get('title')

  updateDay: (model) ->
    html = @_buildCountHtml(model.get('count'))
    $('.label .count', @_getDayElement(model.id)).html(html)

  updateWeekStats: (model) ->
    html = @_buildCountHtml(model.get('count'))
    @$('.controls .count').html(html)
    @assignTabIndices('.day a')

  _buildCountHtml: (count) ->
    chrome.i18n.getMessage('number_of_visits', [
      count,
      '<span class="number_of_visits">',
      '</span>'
    ])

  updatePercentages: (percentages) ->
    @model.get('days').each (model, i) =>
      percentage = @model.get('percentages')[i] + '%'
      $('.bar', @_getDayElement(model.id)).css({width: percentage})
    @$el.addClass('loaded')

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
        @model.fetch
          success: => @promptView.close()
    else
      @promptView.close()

  _getDayElement: (id) ->
    @$("[data-day-id='#{id}']")

  getI18nValues: ->
    @i18nFetcher.get([
      'delete_all_visits_for_filter_button',
      'no_visits_found',
      'search_input_placeholder_text'
    ])
