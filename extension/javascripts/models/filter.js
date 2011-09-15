Filter = Backbone.Model.extend({
  defaults: {
    text: '',
    maxResults: 1000
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
    if(this.get('hash') === 'search') {
      properties.title = this.buildTitle(this.get('text'));
    }
    return properties;
  },

  buildTitle: function(query) {
    var terms = query.split(' '),
        joined = 'Searching ';

    $.each(terms, function(i) {
      joined += '"' + this + '"';
      if(i !== terms.length - 1) {
        joined += ' and ';
      }
    });

    return joined;
  }
});
