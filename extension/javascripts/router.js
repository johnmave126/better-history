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
        self.setLastRoute(urlFragment);
      });
  },

  settings: function() {
    $('.mainview .settings_view').addClass('selected');
  },

  filter: function(id, time) {
    var filter = BH.collections.filters.get(id);
    $('.mainview [data-id=' + filter.id + ']', BH.views.ppView.el).addClass('selected');

    BH.views.filterViews[filter.id].startTime = time;
    filter.fetch();
  },

  search: function(query) {
    BH.models.searchFilter.set({text: query}, {silent: true});
    $('h2', BH.views.searchView.$el).text(BH.models.searchFilter.buildSearchTitle(BH.models.searchFilter.get('text')));
    $('.content', BH.views.searchView.$el).html('');
    $('.mainview [data-id=' + BH.models.searchFilter.id + ']', BH.views.appView.el).addClass('selected');

    BH.models.searchFilter.fetch();
  },

  setLastRoute: function(route) {
    localStorage.lastRoute = route;
  },

  getLastRoute: function() {
    return localStorage.lastRoute || 'filter/0_days_ago';
  }
});
