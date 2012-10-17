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
    @state.updateRoute()

    weeks = new BH.Collections.Weeks()

    window.appView = @app = new BH.Views.AppView
      el: $('.app')
      collection: weeks
      settings: settings
      state: @state
    @app.render()

    @bind 'all', (route) =>
      window.scroll 0, 0
      if settings.get('openLocation') == 'last_visit'
        @state.set route: location.hash

    @reset if location.hash == ''

  reset: ->
    @navigate @state.get('route'), trigger: true

  week: (id) ->
    view = @app.loadWeek(id)
    view.select()
    @_delay -> view.model.history.fetch()

  day: (weekId, id) ->
    view = @app.loadDay weekId, id
    # It's important that change is fired on 'history'
    view.model.unset('history', {silent: true})
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
