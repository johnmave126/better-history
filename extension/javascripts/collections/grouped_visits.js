GroupedVisits = Backbone.Collection.extend({
  model: Visit,

  summary: function() {
    return {
      domain: this.at(0).domain(),
      url: this.at(0).get('url'),
      amount: this.length
    };
  }
});
