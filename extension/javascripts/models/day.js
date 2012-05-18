Day = Backbone.Model.extend({
  format: {
    title: 'dddd',
    subTitle: 'MMMM Do',
    formalDate: 'MMMM Do, YYYY',
    extendedFormalDate: 'dddd, MMMM Do, YYYY',
    id: 'D'
  },

  initialize: function() {
    var id = this._getId();
    this.set({
      title: this._getTitle(),
      subTitle: this._getSubTitle(),
      formalDate: this._getFormalDate(),
      extendedFormalDate: this._getExtendedFormalDate(),
      id: id,
      url: Url.day(this.get('weekId'), id)
    });

    this.bind('change:filter', this.filterHistory, this);
  },

  filterHistory: function() {
    if(this.get('filter')) {
      this.set({history: new TimeVisits()});
    } else {
      this.set({history: this.originalHistory});
    }
  },

  toTemplate: function() {
    return this.toJSON();
  },

  toChrome: function() {
    return {
      text: '',
      startTime: this._getSOD(),
      endTime: this._getEOD()
    };
  },

  sync: function(method, model, options) {
    if(method === 'read') {
      chromeAPI.history.search(this.toChrome(), function(history) {
        options.success(GroupBy.time(history));
      });
    }
  },

  clear: function() {
    var self = this;
    chrome.history.deleteRange({
      startTime: this._getSOD(),
      endTime: this._getEOD()
    }, function() {
      self.set({history: new TimeVisits()});
    });
  },

  parse:function(data) {
    var history = new TimeVisits(),
        count = 0;

    $.each(data, function() {
      history.add({
        id: this.id,
        datetime: this.datetime,
        pageVisits: new PageVisits(this.pageVisits)
      });
      count += this.pageVisits.length;
    });

    this.originalHistory = history;
    return {
      history: history,
      count: count
    };
  },

  _getSOD: function() {
    return new Date(this.get('date').sod()).getTime();
  },

  _getEOD: function() {
    return new Date(this.get('date').eod()).getTime();
  },

  _generateDate: function(by) {
    return moment(this.get('date')).add('days', by);
  },

  _getSubTitle: function() {
    return this.get('date').format(this.format.subTitle);
  },

  _getId: function() {
    return this.get('date').format(this.format.id);
  },

  _getTitle: function() {
    return this.get('date').format(this.format.title);
  },

  _getFormalDate: function() {
    return this.get('date').format(this.format.formalDate);
  },

  _getExtendedFormalDate: function() {
    return this.get('date').format(this.format.extendedFormalDate);
  }
});
