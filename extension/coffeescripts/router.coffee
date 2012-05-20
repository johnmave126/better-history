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
        {date: moment().past('Monday', 0)},
        {date: moment().past('Monday', 1)},
        {date: moment().past('Monday', 2)},
        {date: moment().past('Monday', 3)},
        {date: moment().past('Monday', 4)},
        {date: moment().past('Monday', 5)},
        {date: moment().past('Monday', 6)},
        {date: moment().past('Monday', 7)},
        {date: moment().past('Monday', 8)},
        {date: moment().past('Monday', 9)}
      ])
    ).render()

    Backbone.history.start()

  week: (id) ->
    model = @app.collection.get(id)
    view = @app.views.weeks[model.id]

    $('.mainview > *').removeClass(@selectedClass)
    Helpers.pageTitle(model.get('title'))
    view.$el.addClass(@selectedClass)

    model.fetch()

  day: (weekId, id) ->
    model = @app.collection.get(weekId).get('days').get(id)

    view = @app.views.weeks[@app.collection.get(weekId).id]
    view.$el.addClass(@selectedClass)

    dayView = new BH.Views.DayView({model: model}, @app.options)
    $('body').append(dayView.render().el)
    dayView.bind 'close', =>
      @navigate(BH.Lib.Url.week(weekId))

    dayView.open()
    model.fetch()

  settings: ->
    $('.mainview > *').removeClass(@selectedClass)
    Helpers.pageTitle(chrome.i18n.getMessage('settings_title'))
    @app.views.settings.$el.addClass(@selectedClass)

  search: (query) ->
    $('.mainview > *').removeClass(@selectedClass)
    @app.views.search.$el.addClass(@selectedClass)
    @app.views.search.model.set({query: query})


