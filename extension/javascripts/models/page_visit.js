PageVisit = Backbone.Model.extend({
  defaults: {
    title: '(No Title)'
  },

  initialize: function() {
    if(this.get('title') === '') {
      this.set({title: this.defaults.title});
    }
  },

  presenter: function() {
    var properties = this.toJSON();
    properties.cid = this.cid;
    return properties;
  },

  domain: function() {
    var match = this.get('url').match(/\w+:\/\/(.*?)\//);
    return (match === null ? null : match[0]);
  }
});
