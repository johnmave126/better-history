class BH.Views.AppView extends BH.Views.BaseView
  className: 'app_view'

  template: BH.Templates['app']

  initialize: ->
    @settings = @options.settings

    @collection.reload @settings.get('startingWeekDay')
    @options.state.on 'change', @onStateChanged, @
    @settings.on 'change:startingWeekDay', @onStartingWeekDayChanged, @
    @settings.on 'change:weekDayOrder', @onWeekDayOrderChanged, @
    @collection.on 'reloaded', @onWeeksReloaded, @

    @cache = new BH.Views.Cache(@options)

  render: ->
    @$el.html(@renderTemplate @getI18nValues())
    @renderMenu()
    @

  renderMenu: ->
    menuView = new BH.Views.MenuView
      el: '.menu_view'
      collection: @collection
    menuView.render()

  onStateChanged: ->
    @options.state.save()

  onStartingWeekDayChanged: ->
    @reloadWeeks()

  onWeeksReloaded: ->
    @renderMenu()

  onWeekDayOrderChanged: ->
    @reloadWeeks()
    @cache.expire()

  reloadWeeks: ->
    @collection.reset()
    @collection.reload @settings.get('startingWeekDay')

  loadWeek: (id) ->
    @updateMenuSelection(id)
    @cache.weekView(id)

  loadDay: (id) ->
    weekId = moment(id).past('Wednesday', 0).format('M-D-YY')
    @updateMenuSelection(weekId)
    @cache.dayView(id)

  loadSettings: ->
    @updateMenuSelection()
    @$('.menu .setting').parent().addClass @cssClass.selected
    @cache.settingsView()

  loadSearch: ->
    @updateMenuSelection()
    @cache.searchView()

  updateMenuSelection: (id) ->
    @$('.menu > *').removeClass @cssClass.selected
    @$("[data-week-id='#{id}']").addClass(@cssClass.selected) if id?

  getI18nValues: ->
    @i18nFetcher.get ['history_title', 'settings_link']
