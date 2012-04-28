Router = Backbone.Router.extend({
  routes: {
    'settings': 'settings',
    'filter/:id': 'filter',
    'filter/:id/:time': 'filter',
    'search/*query': 'search'
  },

  selectedClass: 'selected',

  initialize: function() {
    var self = this;
    this
      .bind('route:before', function() {
        $('.mainview > *').removeClass(self.selectedClass);
      })
      .bind('route:after', function(urlFragment) {
        if(urlFragment.length !== 0) {
          BH.models.state.set({'route': urlFragment[0]});
        }
      });
  },

  settings: function() {
    var view = BH.views.settingsView;

    Helpers.pageTitle(chrome.i18n.getMessage('settings_title'));
    view.$el.addClass(this.selectedClass);
  },

  filter: function(id, time) {
    var model = BH.collections.filters.get(id),
        view = BH.views.filterViews[model.id];

    Helpers.pageTitle(model.get('title'));
    view.$el.addClass(this.selectedClass);
    view.startTime = time;

    model.fetch();
  },

  search: function(query) {
    var model = BH.models.searchFilter,
        view = BH.views.searchView;

    view.$el.addClass(this.selectedClass);

    model.set({text: query}).fetch();
  }
});
