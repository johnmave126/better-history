TimeVisits = Backbone.Collection.extend({
  model: TimeVisit,

  destroyAll: function() {
    while(this.length > 0) {
      if(this.at(0)) this.at(0).destroy();
    }
  }
});
