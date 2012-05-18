Router = Backbone.Router.extend({
  routes: {
    'settings': 'settings',
    'search/*query': 'search',
    'weeks/:id': 'week',
    'weeks/:weekId/days/:id': 'day'
  },

  selectedClass: 'selected',

  //_after: function() {
    //if(urlFragment.length !== 0) {
      //BH.models.state.set({'route': urlFragment[0]});
    //}
  //},

  week: function(id) {
    var model = BH.collections.weeks.get(id),
        view = BH.views.weekViews[model.id];

    $('.mainview > *').removeClass(this.selectedClass);
    Helpers.pageTitle(model.get('title'));
    view.$el.addClass(this.selectedClass);
    model.fetch();
  },

  day: function(weekId, id) {
    var model = BH.collections.weeks.get(weekId).get('days').get(id);

    var dayView = new DayView({model: model});
    $('body').append(dayView.render().el);
    var self = this;
    dayView.bind('close', function () {
      self.navigate('#weeks/' + weekId);
    });

    dayView.open();
    model.fetch();
  },

  settings: function() {
    var view = BH.views.settingsView;

    $('.mainview > *').removeClass(this.selectedClass);
    Helpers.pageTitle(chrome.i18n.getMessage('settings_title'));
    view.$el.addClass(this.selectedClass);
  },

  search: function(query) {
    var model = BH.models.searchFilter,
        view = BH.views.searchView;

    $('.mainview > *').removeClass(this.selectedClass);
    view.$el.addClass(this.selectedClass);

    model.set({text: query}).fetch();
  }
});
