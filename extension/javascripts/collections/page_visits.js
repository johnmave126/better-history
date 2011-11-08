PageVisits = Backbone.Collection.extend({
  model: PageVisit,

  destroyAll: function() {
    while(this.length > 0) {
      this.at(0).destroy();
    }
  }
});
