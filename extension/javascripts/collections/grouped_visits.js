GroupedVisits = Backbone.Collection.extend({
  model: PageVisit,

  toTemplate: function() {
    return $.extend({
      domain: this.at(0).domain(),
      url: this.at(0).get('url')
    }, i18n.groupedVisits());
  },

  destroyAll: function() {
    while(this.length > 0) {
      if(this.at(0)) this.at(0).destroy();
    }
  }
});
