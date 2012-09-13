class BH.Router extends Backbone.Router
  routes:
    '': 'reset'
    'settings': 'settings'
    'search/*query': 'search'
    'weeks/:id': 'week'
    'weeks/:weekId/days/:id': 'day'

  initialize: ->
    # yuck, really need to do something about this...
    window.settings = new BH.Models.Settings()
    window.settings.fetch()

    @state = new BH.Models.State()
    @state.fetch()
    @state.updateRoute settings

    window.appView = @app = new BH.Views.AppView
      el: $('.app')
      model: new BH.Models.Version(version: '1.7.9')
      settings: settings
      state: @state
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

    @bind 'all', (route) =>
      console.log 'fuck'
      window.scroll 0, 0
      if settings.get('openLocation') == 'last_visit'
        @state.set route: location.hash

    @reset if location.hash == ''

  reset: ->
    @navigate @state.get('route'), trigger: true

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
