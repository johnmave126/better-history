Router = Backbone.Router.extend({
  routes: {
    'settings': 'settings',
    'settings/:page': 'settings',
    'filter/:id': 'filter',
    'filter/:id/:time': 'filter',
    'search/*query': 'search'
  },

  initialize: function() {
    var self = this;
    this.bind('route:filter', function(id, time) {
      var url = 'filter/' + id;
      if(time) {
        url += '/' + time;
      }
      self.setLastRoute(url);
    });
    this.bind('route:settings', function(page) { self.setLastRoute('settings'); });
    this.bind('route:search', function(page) { self.setLastRoute('search/' + page); });
  },

  settings: function(page) {
    $('.mainview > *', BH.views.appView.el).removeClass('selected');
    $('.mainview .settings_view').addClass('selected');
    if(page === 'credits') {
      BH.views.creditsView.open();
    } else if(page === 'announcement') {
      BH.views.versionView.open();
    }
  },

  filter: function(id, time) {
    var filter = BH.collections.filters.get(id);
    $('.mainview > *', BH.views.appView.el).removeClass('selected');
    $('.mainview [data-id=' + filter.id + ']', BH.views.appView.el).addClass('selected');

    BH.views.filterViews[filter.id].startTime = time;
    filter.fetch();
  },

  search: function(query) {
    BH.models.searchFilter.set({text: query}, {silent: true});
    $('h2', BH.views.searchView.$el).text(BH.models.searchFilter.buildSearchTitle(BH.models.searchFilter.get('text')));
    $('.content', BH.views.searchView.$el).html('');
    $('.mainview > *', BH.views.appView.el).removeClass('selected');
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
