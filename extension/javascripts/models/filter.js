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
    if(this.searching()) {
      title = this.buildSearchTitle(this.get('text'));
    } else if(this.get('daysSinceToday') === 0) {
      title = 'Today';
    } else if(this.get('daysSinceToday') === 1) {
      title = 'Yesterday';
    } else {
      title = DateRanger.numberToDay(this.date().getDay()) + ', ' + this.date().getDate() + '<span class="ordinal" >' + this.ordinal() + '</span>';
    }
    this.set({title: title});
  },

  fetchCount: function() {
    var self = this;
    this.sync('read', this, {
      success: function(data) {
        self.trigger('count', {count: data.length});
      }
    });
  },

  sync: function(method, model, options) {
    if(method === 'read') {
      chromeAPI.history.search(this.options(), function(history) {
        history = model.searching() ? history : GroupBy.time(history);
        options.success(history, model.searching());
      });
    }
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
    properties.date = Helpers.formatDate(this.date());
    return properties;
  },

  buildSearchTitle: function(query) {
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

  searching: function() {
    return this.get('hash') === 'search';
  },

  parse:function(data) {
    var history;
    if(this.searching()) {
      history = new PageVisits(data);
    } else {
      history = new TimeVisits();
      $.each(data, function() {
        history.add({
          id: this.id,
          datetime: this.datetime,
          pageVisits: new PageVisits(this.pageVisits)
        });
      });
    }
    this.set({history: history});
  }
});
