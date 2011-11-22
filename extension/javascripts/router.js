Router = Backbone.Router.extend({
  routes: {
    'settings': 'settings',
    'filter/:type': 'filter',
    'filter/:type/:time': 'filter',
    'search/*query': 'search'
  },

  initialize: function() {
    var self = this;
    this.bind('route:filter', function(type, time) {
      var url = 'filter/' + type;
      if(time) url += '/' + time;
      self.setLastRoute(url);
    });
    this.bind('route:settings', function(page) { self.setLastRoute('settings'); });
    this.bind('route:search', function(page) { self.setLastRoute('search/' + page); });
  },

  settings: function() {
    $('.mainview', appView.el)
      .html(new SettingsView({model: settings}).render().el);
    router.navigate('settings');
  },

  filter: function(type, time) {
    var filter = filters.getByHash(this.checkType(type)),
        filterView = new FilterView({model: filter});

    $('.mainview', appView.el).html(filterView.render().el);

    filterView.startTime = time;
    filter.fetch();
    router.navigate('filter/' + type);
  },

  search: function(query) {
    var filter = new Filter({
      text: query,
      hash: 'search',
      endTime: new Date().getTime(),
      startTime: DateRanger.borders(60).start.getTime()
    });

    $('.mainview', appView.el)
      .html(new SearchView({model: filter}).render().el);

    filter.fetch();
    router.navigate('search/' + query);
  },

  checkType: function(type) {
    return type === undefined || type === 'undefined' ? '0_days_ago' : type;
  },

  setLastRoute: function(route) {
    localStorage.lastRoute = route;
  },

  getLastRoute: function() {
    return localStorage.lastRoute;
  }
});
