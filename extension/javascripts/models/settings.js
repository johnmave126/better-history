Settings = Backbone.Model.extend({
  storeName: 'settings',

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

  parse: function(data) {
    this.set(JSON.parse(data));
  }
});
