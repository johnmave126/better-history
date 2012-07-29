class BH.Views.DayView extends BH.Views.ViewWithSearch
  className: 'day_view with_controls'
  template: BH.Templates['day']

  events:
    'click .delete_day': 'clickedDeleteAll'
    'keyup .search': 'filtered'
    'click .back_to_week': 'backToWeekClicked'

  render: (type) ->
    @$el.html(@renderTemplate(_.extend(@getI18nValues(), @model.toTemplate())))
    @$('button').attr('disabled', 'disabled')
    @

  pageTitle: ->
    @model.get('formalDate')

  renderHistory: ->
    @collection = @model.get('history')

    @$('.search').focus()

    @dayResultsView = new BH.Views.DayResultsView
      collection: @collection
      model: @model
    @$('.content').html(@dayResultsView.render())

    if @collection.length == 0 || @model.get('filter')
      @$('button').attr('disabled', 'disabled')
    else
      @tabIndex($('.content a', @el))
      @$('button').removeAttr('disabled')

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
    url = @urlBuilder.build('search', [@model.get('filter')])
    @$('.full_search').fadeIn('slow')
    @$('.full_search a').attr(href: url)

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
