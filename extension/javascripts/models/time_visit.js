TimeVisit = Backbone.Model.extend({
  initialize: function() {
    this.set({state: localStorage[this.stateKey()] || 'expanded'});
  },

  presenter: function() {
    return {
      amount: this.get('pageVisits').length,
      time: this.get('time'),
      state: this.get('state')
    };
  },

  key: function() {
    return this.get('date') + ' ' + this.get('time');
  },

  setState: function(state) {
    localStorage[this.stateKey()] = state;
    this.set({state: state});
  },

  stateKey: function() {
    return 'timeVisits.' + this.key() + '.state';
  }
});
