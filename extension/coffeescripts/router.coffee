class BH.Router extends Backbone.Router
  routes:
    'settings': 'settings'
    'search/*query': 'search'
    'weeks/:id': 'week'
    'weeks/:weekId/days/:id': 'day'

  selectedClass: 'selected'

  initialize: ->
    # yuck
    window.settings = new BH.Models.Settings()
    window.version = new BH.Models.Version({version: '1.6.0'})
    window.appView = @app = new BH.Views.AppView(
      el: $('.app')
      model: version
      collection: new BH.Collections.Weeks([
        {date: moment().past(chrome.i18n.getMessage('monday'), 0)},
        {date: moment().past(chrome.i18n.getMessage('monday'), 1)},
        {date: moment().past(chrome.i18n.getMessage('monday'), 2)},
        {date: moment().past(chrome.i18n.getMessage('monday'), 3)},
        {date: moment().past(chrome.i18n.getMessage('monday'), 4)},
        {date: moment().past(chrome.i18n.getMessage('monday'), 5)},
        {date: moment().past(chrome.i18n.getMessage('monday'), 6)},
        {date: moment().past(chrome.i18n.getMessage('monday'), 7)},
        {date: moment().past(chrome.i18n.getMessage('monday'), 8)},
        {date: moment().past(chrome.i18n.getMessage('monday'), 9)}
      ])
    ).render()
    window.state = new BH.Models.State
      route: BH.Lib.Url.week(@app.collection.at(0).id)

    @bind 'route:before', () =>
      $('.mainview > *').removeClass(@selectedClass)
    @bind 'route:after', (urlFragment) ->
      if urlFragment.length != 0
        state.set({'route': urlFragment})


  week: (id) ->
    model = @app.collection.get(id)
    view = @app.views.weeks[model.id]

    Helpers.pageTitle(model.get('title'))
    view.$el.addClass(@selectedClass)

    model.fetch()

  day: (weekId, id) ->
    weekModel = @app.collection.get(weekId)
    model = weekModel.get('days').get(id)

    view = @app.views.weeks[@app.collection.get(weekId).id]
    view.$el.addClass(@selectedClass)

    dayView = new BH.Views.DayView
      model: model

    $('body').append(dayView.render().el)
    dayView.bind 'close', =>
      @navigate(BH.Lib.Url.week(weekId))

    dayView.open()
    model.fetch()

  settings: ->
    Helpers.pageTitle(chrome.i18n.getMessage('settings_title'))
    @app.views.settings.$el.addClass(@selectedClass)

  search: (query) ->
    @app.views.search.$el.addClass(@selectedClass)
    @app.views.search.model.set({query: query})


