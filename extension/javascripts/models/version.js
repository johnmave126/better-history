Version = Backbone.Model.extend({
  initialize: function() {
    var suppress = stringToBool(localStorage[this.suppressKey()]);
    this.set({suppress: suppress});
  },

  presenter: function() {
    return {visibility: (this.get('suppress') ? '' : 'show')};
  },

  key: function() {
    return 'versions.' + this.get('version');
  },

  setSuppress: function(value) {
    if(value) {
      localStorage[this.suppressKey()] = boolToString(value);
    } else {
      delete(localStorage[this.suppressKey()]);
    }
    this.set({suppress: value});
  },

  suppressKey: function() {
    return this.key() + '.suppress';
  }
});
