Filter = Backbone.Model.extend({
  defaults: {
    text: '',
    maxResults: 0
  },

  initialize: function() {
    if(this.get('hash') === undefined) {
      this.set({hash: this.get('daysSinceToday') + '_days_ago'});
    }

    var title;
    if(this.get('hash') === 'search') {
      title = this.buildTitle(this.get('text'));
    } else if(this.get('daysSinceToday') === 0) {
      title = 'Today';
    } else if(this.get('daysSinceToday') === 1) {
      title = 'Yesterday';
    } else {
      title = DateRanger.numberToDay(this.date().getDay()) + ', ' + this.date().getDate() + '<span class="ordinal" >' + this.ordinal() + '</span>';
    }
    this.set({title: title});
  },

  date: function() {
    return new Date(this.get('startTime'));
  },

  ordinal: function() {
    var date = this.date().getDate();
    if(date === 1 || date === 21 || date === 31) return 'st';
    else if(date === 2 || date === 22) return 'nd';
    else if(date === 3 || date === 23) return 'rd';
    else return 'th';
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
  },

  parse:function(data) {
    if(this.get('text').length > 0) {
      this.set({visits: new PageVisits(data)});
    } else {
      var timeVisits = new TimeVisits();
      $.each(data, function(i, timeVisit) {
        timeVisits.add({time:timeVisit.time, visits: new PageVisits(timeVisit.visits)});
      });
      this.set({timeVisits: timeVisits});
    }
  }
});
