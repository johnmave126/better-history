class BH.Views.Cache
  constructor: (@options) ->
    @expire()

  expire: ->
    @cache =
      weeks: {}
      days: {}

  week: (id) ->
    if !@cache.weeks[id]
      @cache.weeks[id] = new BH.Views.WeekView
        model: new BH.Models.Week(date: moment(new Date(id)))
      @insert @cache.weeks[id].render().el

    @cache.weeks[id]

  day: (id) ->
    if !@cache.days[id]
      @cache.days[id] = new BH.Views.DayView
        model: new BH.Models.Day(date: moment(new Date(id)))

      @insert @cache.days[id].render().el
    @cache.days[id]

  settings: ->
    if !@cache.settings
      @cache.settings = new BH.Views.SettingsView
        model: @options.settings
        state: @options.state
      @insert @cache.settings.render().el
    @cache.settings

  search: ->
    if !@cache.search
      @cache.search = new BH.Views.SearchView
        model: new BH.Models.Search()
      @insert @cache.search.render().el
    @cache.search

  insert: (html) ->
    $('.mainview').append html

