Filter = Backbone.Model.extend({
  defaults: {
    text: '',
    maxResults: 2000
  },

  options: function() {
    return {
      text: this.get('text'),
      maxResults: this.get('maxResults'),
      startTime: this.get('startTime'),
      endTime: this.get('endTime')
    };
  },

  presenter: function() {
    var properties = this.toJSON();
    properties.cid = this.cid;
    return properties;
  }
});
