class BH.Router extends Backbone.Router
  routes:
    'settings': 'settings'
    'search/*query': 'search'
    'weeks/:id': 'week'
    'weeks/:weekId/days/:id': 'day'

  selectedClass: 'selected'

#  _after: function() {
#    if(urlFragment.length !== 0) {
#      BH.models.state.set({'route': urlFragment[0]});
#    }

  initialize: ->
    window.app = @app = new BH.Views.AppView(
      el: $('.app')
      model: new BH.Models.Version({version: '1.6.0'})
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
    , settings: new BH.Models.Settings()).render()

    Backbone.history.start()

#    if(!location.hash) {
#      @navigate(BH.models.state.get('route'), {trigger: true});
#    }

  week: (id) ->
    model = @app.collection.get(id)
    view = @app.weekViews[model.id]

    $('.mainview > *').removeClass(@selectedClass)
    Helpers.pageTitle(model.get('title'))
    view.$el.addClass(@selectedClass)

    model.fetch()

  day: (weekId, id) ->
    model = @app.collection.get(weekId).get('days').get(id)

    dayView = new BH.Views.DayView({model: model}, @app.options)
    $('body').append(dayView.render().el)
    dayView.bind 'close', =>
      @navigate(BH.Lib.Url.week(weekId))

    dayView.open()
    model.fetch()

  settings: ->
    $('.mainview > *').removeClass(@selectedClass)
    Helpers.pageTitle(chrome.i18n.getMessage('settings_title'))
    @views.settingsView.$el.addClass(@selectedClass)

  search: (query) ->
    model = BH.models.searchFilter

    $('.mainview > *').removeClass(@selectedClass)
    @views.searchView.$el.addClass(@selectedClass)

    model.set({text: query}).fetch()
