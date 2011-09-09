Router = Backbone.Router.extend({
  routes: {
    '': 'filter',
    'filter/:type': 'filter',
    'search/:query': 'search'
  },

  filter: function(type) {
    type = this.checkType(type);

    var filterView = new FilterView({model: filters.getByHash(type), el: $('.mainview')});
    filterView.render();

    router.navigate("filter/" + type);
  },

  search: function(query) {
    var filter = new Filter({
      text: query,
      hash: 'search',
      date: 'All history',
      title: 'Search "' + query + '"',
      startTime: 0
    });

    var filterView = new FilterView({model: filter, el: $('.mainview')});
    filterView.render();

    router.navigate("search/" + query);
  },

  checkType: function(type) {
    return (type === undefined ? 'today' : type);
  }
});
