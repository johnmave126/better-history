class BH.Views.AppView extends BH.Views.BaseView
  className: 'app_view'

  template: BH.Templates['app']

  views:
    weeks: {}
    days: {}

  initialize: ->
    @collection.reload @options.settings.get('startingWeekDay')
    @options.state.on 'change', @options.state.save, @options.state
    @options.settings.on 'change:startingWeekDay', @reloadWeeks, @
    @collection.on 'reloaded', @renderMenu, @

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
    if !@views.weeks[id]
      @views.weeks[id] = new BH.Views.WeekView
        model: @collection.get id
      @_insert @views.weeks[id].render().el

    @_selectWeek @$("[data-week-id='#{id}']")
    @views.weeks[id]

  loadDay: (weekId, id) ->
    @_selectWeek @$("[data-week-id='#{weekId}']")
    if !@views.days[weekId]
      @views.days[weekId] = {}

    if !@views.days[weekId][id]
      model = @collection.get(weekId).get('days').get(id)
      @views.days[weekId][id] = new BH.Views.DayView
        model: model,
        weekModel: @collection.get(weekId)

      @_insert @views.days[weekId][id].render().el
    @views.days[weekId][id]

  loadSettings: ->
    @_clearMenuSelection()
    @$('.menu .setting').parent().addClass @cssClass.selected
    if !@views.settings
      @views.settings = new BH.Views.SettingsView
        model: @options.settings
        version: @model
        state: @options.state
      @_insert @views.settings.render().el
    @views.settings

  loadSearch: ->
    if !@views.search
      @views.search = new BH.Views.SearchView
        model: new BH.Models.Search()
      @_insert @views.search.render().el
    @views.search

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
