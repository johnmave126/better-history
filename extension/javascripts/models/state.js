State = Backbone.Model.extend({
  storeName: 'state',

  defaults: {
    route: 'filter/0_days_ago'
  },

  initialize: function() {
    this.bind('change', this.save, this);
  },

  parse: function(data) {
    this.set(JSON.parse(data));
  }
});
