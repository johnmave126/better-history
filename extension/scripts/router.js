Router = Backbone.Router.extend({
  routes: {
    '': 'filter',
    'filter/:type': 'filter'
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

  checkType: function(type) {
    return (type === undefined ? 'today' : type);
  }
});
