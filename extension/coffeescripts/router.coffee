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
    window.state = new BH.Models.State
          route: new BH.Helpers.UrlBuilder().build('week', [@app.collection.at(0).id])
    window.state.fetch()

    @bind 'all', (route) ->
      window.scroll 0, 0
      state.set route: location.hash

  week: (id) ->
    @app.loadWeek(id)
    view = @app.views.weeks[id]
    view.select()
    @_delay -> view.model.fetch()

  day: (weekId, id) ->
    @app.loadWeek weekId
    view = @app.views.weeks[weekId]
    view.model.get('days').get(id).fetch
      success: -> view.selectDay id

  settings: ->
    @app.loadSettings()
    view = @app.views.settings
    view.select()

  search: (query) ->
    @app.loadSearch()
    view = @app.views.search
    view.select()
    @_delay -> view.model.set query: decodeURIComponent(query)

  _delay: (callback) ->
    setTimeout (-> callback()), 250
