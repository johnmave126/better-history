class BH.Views.AppView extends BH.Views.BaseView
  className: 'app_view'

  template: BH.Templates['app']

  initialize: ->
    @collection.reload @options.settings.get('startingWeekDay')
    @options.state.on 'change', @options.state.save, @options.state
    @options.settings.on 'change:startingWeekDay', @reloadWeeks, @
    @collection.on 'reloaded', @renderMenu, @

    @cachedViews =
      weeks: {}
      days: {}

  render: ->
    @$el.html(@renderTemplate @getI18nValues())
    @renderMenu()
    @

  renderMenu: ->
    menuView = new BH.Views.MenuView
      el: '.menu_view'
      collection: @collection
    menuView.render()

  reloadWeeks: (settings) ->
    @collection.reload settings.get('startingWeekDay')

  loadWeek: (id) ->
    if !@cachedViews.weeks[id]
      @cachedViews.weeks[id] = new BH.Views.WeekView
        model: @collection.get id
      @_insert @cachedViews.weeks[id].render().el

    @_selectWeek @$("[data-week-id='#{id}']")
    @cachedViews.weeks[id]

  loadDay: (weekId, id) ->
    @_selectWeek @$("[data-week-id='#{weekId}']")
    if !@cachedViews.days[weekId]
      @cachedViews.days[weekId] = {}

    if !@cachedViews.days[weekId][id]
      model = @collection.get(weekId).get('days').get(id)
      @cachedViews.days[weekId][id] = new BH.Views.DayView
        model: model,
        weekModel: @collection.get(weekId)

      @_insert @cachedViews.days[weekId][id].render().el
    @cachedViews.days[weekId][id]

  loadSettings: ->
    @_clearMenuSelection()
    @$('.menu .setting').parent().addClass @cssClass.selected
    if !@cachedViews.settings
      @cachedViews.settings = new BH.Views.SettingsView
        model: @options.settings
        version: @model
        state: @options.state
      @_insert @cachedViews.settings.render().el
    @cachedViews.settings

  loadSearch: ->
    if !@cachedViews.search
      @cachedViews.search = new BH.Views.SearchView
        model: new BH.Models.Search()
      @_insert @cachedViews.search.render().el
    @cachedViews.search

  _selectWeek: (element) ->
    @_clearMenuSelection()
    $(element).addClass @cssClass.selected

  _clearMenuSelection: ->
    @$('.menu > *').removeClass @cssClass.selected

  _insert: (html) ->
    @$('.mainview').append html

  getI18nValues: ->
    @i18nFetcher.get [
      'history_title',
      'settings_link',
    ]
