Settings = Backbone.Model.extend({
  defaults: function() {
    return {
      timeGrouping: 15,
      domainGrouping: true,
      timeFormat: parseInt(chrome.i18n.getMessage('default_time_format'), 10),
      searchByDomain: true,
      searchBySelection: true
    };
  },

  timeGrouping: function() {
    return parseInt(this.get('timeGrouping'), 10);
  },

  timeFormat: function() {
    return parseInt(this.get('timeFormat'), 10);
  },

  sync: function(method, model, options) {
    if(method === 'create') {
      localStorage.settings = JSON.stringify(this);
      options.success(this);
    } else if(method === 'read') {
      var parsedSettings = {};
      if(localStorage.settings) parsedSettings = JSON.parse(localStorage.settings);
      options.success(parsedSettings);
    }
  },

  parse: function(data) {
    this.set(data);
  }
});
