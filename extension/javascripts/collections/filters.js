Filters = Backbone.Collection.extend({
  model: Filter,

  getByHash: function(hash) {
    return this.at(this.pluck('hash').indexOf(hash));
  }
});
