Router = Backbone.Router.extend({
  routes: {
    '': 'filter',
    'filter/:type': 'filter',
    'search/*query': 'search'
  },

  filter: function(type) {
    type = this.checkType(type);

    var filterView = new FilterView({model: filters.getByHash(type)});
    this.insert(filterView.render().el);

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
    this.insert(searchView.render().el);

    router.navigate("search/" + query);
  },

  insert: function(content) {
    $('.mainview').html(content);
  },

  checkType: function(type) {
    return (type === undefined ? '0_days_ago' : type);
  }
});
