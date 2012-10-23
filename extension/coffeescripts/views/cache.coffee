class BH.Views.Cache
  constructor: (@options) ->
    @expire()

  expire: ->
    @cache =
      weeks: {}
      days: {}

  week: (id) ->
    if !@cache.weeks[id]
      week =    new BH.Models.Week(date: moment(new Date(id)))
      history = new BH.Models.WeekHistory(week.toHistory())

      @cache.weeks[id] = new BH.Views.WeekView
        model: week
        history: history

      @insert @cache.weeks[id].render().el

    @cache.weeks[id]

  day: (id) ->
    if !@cache.days[id]
      day =     new BH.Models.Day(date: moment(new Date(id)))
      history = new BH.Models.DayHistory(day.toHistory())

      @cache.days[id] = new BH.Views.DayView
        model: day
        history: history

      @insert @cache.days[id].render().el

    @cache.days[id]

  search: ->
    if !@cache.search
      search =  new BH.Models.Search()
      history = new BH.Models.SearchHistory(search.toHistory())

      @cache.search = new BH.Views.SearchView
        model: search
        history: history

      @insert @cache.search.render().el
    @cache.search

  settings: ->
    if !@cache.settings
      @cache.settings = new BH.Views.SettingsView
        model: @options.settings
        state: @options.state
      @insert @cache.settings.render().el

    @cache.settings

  insert: (html) ->
    $('.mainview').append html

