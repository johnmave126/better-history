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
      title = chrome.i18n.getMessage('today_link');
    } else if(this.get('daysSinceToday') === 1) {
      title = chrome.i18n.getMessage('yesterday_link');
    } else {
      var weekName = chrome.i18n.getMessage(DateRanger.numberToDay(this.date().getDay())),
          date = chrome.i18n.getMessage(this.date().getDate().toString()),
          ordinal = chrome.i18n.getMessage('ordinal_' + this.date().getDate());

      title = chrome.i18n.getMessage('informal_date', [weekName, date, ordinal, '<span class="ordinal">', '</span>']);
    }
    this.set({title: title});

    var formal_date;
    var month = chrome.i18n.getMessage(DateRanger.numberToMonth(this.date().getMonth())),
        day = chrome.i18n.getMessage(this.date().getDate().toString()),
        year = this.date().getFullYear();

    formal_date = chrome.i18n.getMessage("formal_date", [month, day, year]);
    this.set({formal_date: formal_date});
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

  destroyHistory: function(callback) {
    chrome.history.deleteRange({
      startTime: this.get('startTime'),
      endTime: this.get('endTime')
    }, callback);
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
    return properties;
  },

  buildSearchTitle: function(query) {
    var terms = query.split(' '),
        joined = chrome.i18n.getMessage('searching_title') + ' ';

    $.each(terms, function(i) {
      joined += '"' + this + '"';
      if(i !== terms.length - 1) {
        joined += ' ' + chrome.i18n.getMessage('and') + ' ';
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
