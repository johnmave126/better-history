TimeVisit = Backbone.Model.extend({
  presenter: function() {
    return {
      amount: this.get('pageVisits').length,
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
    var fullId = Helpers.formatDate(this.get('datetime')) + ' ' + this.get('id');
    return 'timeVisits.' + fullId + '.collapsed';
  }
});
