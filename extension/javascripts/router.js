Router = Backbone.Router.extend({
  routes: {
    '': 'filter',
    'settings': 'settings',
    'filter/:type': 'filter',
    'search/*query': 'search'
  },

  settings: function() {
    $('.mainview', appView.el)
      .html(new SettingsView().render().el);
  },

  filter: function(type) {
    var filter = filters.getByHash(type);

    $('.mainview', appView.el)
      .html(new FilterView({model: filter}).render().el);

    filter.fetch();
    router.navigate("filter/" + type);
  },

  search: function(query) {
    var filter = new Filter({
      text: query,
      hash: 'search',
      endTime: new Date().getTime(),
      startTime: DateRanger.borders(60).start.getTime(),
      timeGrouping: 0
    });

    $('.mainview', appView.el)
      .html(new SearchView({model: filter}).render().el);

    filter.fetch();
    router.navigate("search/" + query);
  }
});
