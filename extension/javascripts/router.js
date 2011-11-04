Router = Backbone.Router.extend({
  routes: {
    '': 'filter',
    'filter/:type': 'filter',
    'search/*query': 'search'
  },

  filter: function(type) {
    var filter = filters.getByHash(type);

    var filterView = new FilterView({model: filter});
    $('.mainview', appView.el).html(filterView.render().el);

    filter.fetch({searchOptions: filter.options()});
    router.navigate("filter/" + type);
  },

  search: function(query) {
    var filter = new Filter({
      text: query,
      hash: 'search',
      endTime: new Date().getTime(),
      startTime: DateRanger.borders(60).start.getTime()
    });

    var searchView = new SearchView({model: filter});
    $('.mainview', appView.el).html(searchView.render().el);

    filter.fetch({searchOptions: filter.options()});
    router.navigate("search/" + query);
  }
});
