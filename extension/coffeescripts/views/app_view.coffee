class BH.Views.AppView extends BH.Views.BaseView
  className: 'app_view'

  template: BH.Templates['app']

  initialize: ->
    @collection.reload @options.settings.get('startingWeekDay')
    @options.state.on 'change', @onStateChanged, @
    @options.settings.on 'change:startingWeekDay', @onStartingWeekDayChanged, @
    @options.settings.on 'change:weekDayOrder', @onWeekDayOrderChanged, @
    @collection.on 'reloaded', @onWeeksReloaded, @

    @viewCache = new BH.Views.Cache(@options)

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
    @viewCache.expire()

  reloadWeeks: ->
    @collection.reset()
    @collection.reload @options.settings.get('startingWeekDay')

  loadWeek: (id) ->
    @$('.menu > *').removeClass @cssClass.selected
    @$("[data-week-id='#{id}']").addClass @cssClass.selected
    @viewCache.week(id)

  loadDay: (id) ->
    weekId = moment(id).past('Wednesday', 0).format('M-D-YY')
    @$('.menu > *').removeClass @cssClass.selected
    @$("[data-week-id='#{weekId}']").addClass @cssClass.selected
    @viewCache.day(id)

  loadSettings: ->
    @$('.menu > *').removeClass @cssClass.selected
    @$('.menu .setting').parent().addClass @cssClass.selected
    @viewCache.settings()

  loadSearch: ->
    @$('.menu > *').removeClass @cssClass.selected
    @viewCache.search()

  getI18nValues: ->
    @i18nFetcher.get ['history_title', 'settings_link']
