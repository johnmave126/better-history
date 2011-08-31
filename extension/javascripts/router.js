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
    var filterView = new FilterView({
      model: new Filter({text: query, title: 'Search "' + query + '"'}),
      el: $('.mainview')
    });
    filterView.render();
    router.navigate("search/" + query);
  },

  checkType: function(type) {
    return (type === undefined ? 'today' : type);
  }
});
