GroupedVisits = Backbone.Collection.extend({
  model: PageVisit,

  summary: function() {
    return {
      domain: this.at(0).domain(),
      url: this.at(0).get('url')
    };
  },

  destroyAll: function() {
    while(this.length > 0) {
      if(this.at(0)) this.at(0).destroy();
    }
  }
});
