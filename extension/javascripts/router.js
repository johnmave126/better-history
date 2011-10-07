Router = Backbone.Router.extend({
  routes: {
    '': 'filter',
    'filter/:type': 'filter',
    'search/:query': 'search'
  },

  filter: function(type) {
    type = this.checkType(type);

    var filterView = new FilterView({
      model: filters.getByHash(type),
      el: $('.mainview')
    });
    filterView.render();

    router.navigate("filter/" + type);
  },

  search: function(query) {
    var filter = new Filter({
      text: query,
      hash: 'search',
      endTime: new Date().getTime(),
      startTime: DateRanger.borders(60).start.getTime()
    });


    var searchView = new SearchView({model: filter, el: $('.mainview')});
    searchView.render();

    router.navigate("search/" + query);
  },

  checkType: function(type) {
    return (type === undefined ? 'day_0' : type);
  }
});
