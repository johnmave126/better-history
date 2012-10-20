class BH.Router extends Backbone.Router
  routes:
    '': 'reset'
    'settings': 'settings'
    'search/*query': 'search'
    'weeks/:id': 'week'
    'days/:id': 'day'

  initialize: ->
    # yuck, really need to do something about this...
    window.settings = new BH.Models.Settings()
    window.settings.fetch()

    @state = new BH.Models.State()
    @state.fetch()
    @state.updateRoute()

    @app = new BH.Views.AppView
      el: $('.app')
      collection: new BH.Collections.Weeks()
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

  day: (id) ->
    view = @app.loadDay id
    view.model.history.fetch()
    view.select()

  settings: ->
    view = @app.loadSettings()
    view.select()

  search: (query) ->
    view = @app.loadSearch()
    view.model.set query: decodeURIComponent(query)
    view.select()
    @_delay -> view.model.history.fetch()

  _delay: (callback) ->
    setTimeout (-> callback()), 250
