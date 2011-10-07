Filter = Backbone.Model.extend({
  defaults: {
    text: '',
    maxResults: 0
  },

  initialize: function() {
    if(this.get('hash') === undefined) {
      this.set({hash: 'day_' + this.get('daysSinceToday')});
    }

    var title;
    if(this.get('daysSinceToday') === 0) {
      title = 'Today';
    } else if(this.get('daysSinceToday') === 1) {
      title = 'Yesterday';
    } else if(this.get('daysSinceToday') >= 2 && this.get('daysSinceToday') <= 6) {
      title = DateRanger.numberToDay(this.date().getDay());
    } else {
      title = 'Last ' + DateRanger.numberToDay(this.date().getDay());
    }
    this.set({title: title});
  },

  date: function() {
    return new Date(this.get('startTime'));
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
    properties.date = this.date().toLocaleDateString().match(/([^,]*),(.*)/)[2];
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
