Router = Backbone.Router.extend({
  routes: {
    '': 'filter',
    'filter/:type': 'filter',
    'search/:query': 'search'
  },

  filter: function(type) {
    type = this.checkType(type);
    var filterView = new FilterView({
      model: filters.getByHash(type)
    });
    this.insert(filterView.render().el);
    router.navigate("filter/" + type);
  },

  search: function(query) {
    var searchView = new SearchView({
      model: new Filter({text: query})
    });
    this.insert(searchView.render().el);
    router.navigate("search/" + query);
  },

  insert: function(content) {
    $('.mainview').html(content);
    $('.spinner').spin();
  },

  checkType: function(type) {
    return (type === undefined ? 'today' : type);
  }
});
