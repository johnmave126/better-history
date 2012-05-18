Days = Backbone.Collection.extend({
  model: Day,

  toTemplate: function() {
    var days = [];
    this.each(function(model) {
      days.push(model.toTemplate());
    });
    return {days: days};
  },

  clear: function() {
    this.each(function(model) {
      model.clear();
    });
  }
});
