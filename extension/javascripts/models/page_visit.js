PageVisit = Backbone.Model.extend({
  defaults: {
    title: '(No Title)'
  },

  initialize: function() {
    if(this.get('title') === '') {
      this.set({title: this.defaults.title});
    }
  },

  sync: function(method, model, options) {
    if(method === 'delete') {
      chrome.history.deleteUrl({url: this.get('url')});
      options.success(this);
    }
  },

  toTemplate: function() {
    var properties = this.toJSON();
    properties.cid = this.cid;
    return properties;
  },

  domain: function() {
    var match = Helpers.getDomain(this.get('url'));
    return (match === null ? null : match[0]);
  }
});
