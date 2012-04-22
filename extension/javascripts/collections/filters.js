Filters = Backbone.Collection.extend({
  model: Filter,

  toTemplate: function() {
    var filters = [];
    this.each(function(filter) {
      filters.push(filter.toTemplate());
    });

    return {
      this_week_filters: filters.slice(0, 7),
      last_week_filters: filters.slice(7, 14)
    };
  },

  getByHash: function(hash) {
    return this.at(this.pluck('hash').indexOf(hash));
  },

  fetchCounts: function() {
    $(this.models).each(function() {
      this.fetchCount();
    });
  }
});
