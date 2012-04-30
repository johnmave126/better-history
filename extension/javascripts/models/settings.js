Settings = Backbone.Model.extend({
  storeName: 'settings',

  defaults: function() {
    return {
      timeGrouping: 15,
      domainGrouping: true,
      timeFormat: parseInt(chrome.i18n.getMessage('default_time_format'), 10),
      searchByDomain: true,
      searchBySelection: true
    };
  },

  toTemplate: function() {
    return _.extend({
      timeGrouping: [
        {
          text: chrome.i18n.getMessage('15_minutes_option'),
          value: 15,
          selected: this._timeGroupingSelectedCheck(15)
        },
        {
          text: chrome.i18n.getMessage('30_minutes_option'),
          value: 30,
          selected: this._timeGroupingSelectedCheck(30)
        },
        {
          text: chrome.i18n.getMessage('60_minutes_option'),
          value: 60,
          selected: this._timeGroupingSelectedCheck(60)
        }
      ],
      timeFormats: [
        {
          text: chrome.i18n.getMessage('12_hours_option'),
          value: 12,
          selected: this._timeFormatSelectedCheck(12)
        },
        {
          text: chrome.i18n.getMessage('24_hours_option'),
          value: 24,
          selected: this._timeFormatSelectedCheck(24)
        }
      ],
      searchBySelection: this.get('searchBySelection'),
      searchByDomain: this.get('searchByDomain'),
      domainGrouping: this.get('domainGrouping'),
      version: BH.models.version.get('version')
    }, i18n.settings());
  },

  _timeGroupingSelectedCheck: function(value) {
    return (value == this.get('timeGrouping') ? true : false);
  },

  _timeFormatSelectedCheck: function(value) {
    return (value == this.get('timeFormat') ? true : false);
  },

  timeGrouping: function() {
    return parseInt(this.get('timeGrouping'), 10);
  },

  timeFormat: function() {
    return parseInt(this.get('timeFormat'), 10);
  },

  parse: function(data) {
    this.set(JSON.parse(data));
  }
});
