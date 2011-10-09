TimeVisit = Backbone.Model.extend({
  initialize: function() {
    var collapsed = stringToBool(localStorage[this.collapsedKey()]);
    this.set({collapsed: collapsed});
  },

  presenter: function() {
    return {
      amount: this.get('pageVisits').length,
      time: this.get('time'),
      state: (this.get('collapsed') ? 'collapsed' : '')
    };
  },

  key: function() {
    return 'timeVisits.' + this.get('date') + ' ' + this.get('time');
  },

  setCollapsed: function(state) {
    if(state) {
      localStorage[this.collapsedKey()] = boolToString(state);
    } else {
      delete(localStorage[this.collapsedKey()]);
    }
    this.set({collapsed: state});
  },

  collapsedKey: function() {
    return this.key() + '.collapsed';
  }
});
