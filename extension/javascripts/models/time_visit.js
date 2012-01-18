TimeVisit = Backbone.Model.extend({
  presenter: function() {
    return {
      amount: chrome.i18n.getMessage('number_of_visits', [
        this.get('pageVisits').length,
        '<span class="amount">',
        '</a>'
      ]),
      time: Helpers.formatTime(this.get('datetime'), settings.timeFormat()),
      state: (this.get('collapsed') ? 'collapsed' : ''),
      id: this.id
    };
  },

  key: function() {
  },

  sync: function(method, model, options) {
    if(method === 'update') {
      var state = this.get('collapsed');
      if(state) {
        localStorage[this.collapsedKey()] = boolToString(state);
      } else {
        delete(localStorage[this.collapsedKey()]);
      }
      options.success(this);
    } else if(method === 'read') {
      options.success({
        collapsed: stringToBool(localStorage[this.collapsedKey()])
      });
    }
  },

  parse: function(data) {
    this.set(data);
  },

  setCollapsed: function(state) {
    this.set({collapsed: state});
    this.save();
  },

  collapsedKey: function() {
    return 'timeVisits.' + this.getDateId() + '.collapsed';
  },

  getDateId: function() {
    var date = this.get('datetime');
    var month = date.getMonth(),
        dateNumber = date.getDate(),
        year = date.getFullYear();

    return $.trim(month + ' ' + dateNumber + ', ' + year + ' ' + this.get('id'));
  }
});
