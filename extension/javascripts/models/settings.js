Settings = Backbone.Model.extend({
  defaults: {
    timeGrouping: 15,
    domainGrouping: true
  },

  timeGrouping: function() {
    return parseInt(this.get('timeGrouping'), 10);
  },

  sync: function(method, model, options) {
    if(method === 'create') {
      localStorage.settings = JSON.stringify(this);
      options.success(this);
    } else if(method === 'read') {
      options.success(JSON.parse(localStorage.settings));
    }
  },

  parse: function(data) {
    this.set(data);
  }
});
