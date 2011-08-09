Filter = Backbone.Model.extend({
  defaults: {
    text: '',
    maxResults: 10000,
  },

  options: function() {
    return {
      text: this.get('text'),
      maxResults: this.get('maxResults'),
      startTime: this.get('startTime'),
      endTime: this.get('endTime')
    };
  }
});
