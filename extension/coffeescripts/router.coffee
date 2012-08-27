class BH.Router extends Backbone.Router
  routes:
    'settings': 'settings'
    'search/*query': 'search'
    'weeks/:id': 'week'
    'weeks/:weekId/days/:id': 'day'

  initialize: ->
    # yuck
    window.settings = new BH.Models.Settings()
    window.settings.fetch()

    window.version = new BH.Models.Version
      version: '1.7.0'
    window.appView = @app = new BH.Views.AppView
      el: $('.app')
      model: version
      settings: settings
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
    @app.render()

    urlBuilder = new BH.Helpers.UrlBuilder()

    window.state = new BH.Models.State
      route: urlBuilder.build('week', [@app.collection.at(0).id])
    window.state.fetch()

    if settings.get('openLocation') == 'current_day'
      route = urlBuilder.build 'day', [
        @app.collection.at(0).id,
        new Date().getDate()
      ]
    else if settings.get('openLocation') == 'current_week'
      route = urlBuilder.build 'week', [
        @app.collection.at(0).id
      ]

    state.set route: route if route?

    @bind 'all', (route) ->
      window.scroll 0, 0
      if settings.get('openLocation') == 'last_visit'
        state.set route: location.hash

  week: (id) ->
    view = @app.loadWeek(id)
    view.select()
    @_delay -> view.model.fetch()

  day: (weekId, id) ->
    view = @app.loadDay weekId, id
    view.model.fetch()
    view.select()

  settings: ->
    view = @app.loadSettings()
    view.select()

  search: (query) ->
    view = @app.loadSearch()
    view.select()
    @_delay -> view.model.set query: decodeURIComponent(query)

  _delay: (callback) ->
    setTimeout (-> callback()), 250
