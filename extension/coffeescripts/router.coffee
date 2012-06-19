class BH.Router extends Backbone.Router
  routes:
    'settings': 'settings'
    'search/*query': 'search'
    'weeks/:id': 'week'
    'weeks/:weekId/days/:id': 'day'

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
      route: new BH.Helpers.UrlBuilder().build('week', [@app.collection.at(0).id])

    @bind 'route:after', (urlFragment) ->
      if urlFragment.length != 0
        state.set({'route': urlFragment})

  week: (id) ->
    @app.weekSelected(id)

    view = @app.views.weeks[id]
    view.model.fetch()
    view.select()

  day: (weekId, id) ->
    @app.weekSelected(weekId)

    view = @app.views.weeks[weekId]
    view.model.fetch()
    view.select()

    model = view.model.get('days').get(id)
    new BH.Views.DayView(
      model: model
      weekModel: view.model
    ).open()

    model.fetch()

  settings: ->
    view = @app.views.settings
    view.select()

  search: (query) ->
    view = @app.views.search
    view.select()
    view.model.set({query: query})
