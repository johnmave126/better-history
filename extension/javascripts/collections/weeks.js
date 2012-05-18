Weeks = Backbone.Collection.extend({
  model: Week,

  toTemplate: function() {
    var weeks = [];

    this.each(function(model) {
      weeks.push(model.toTemplate());
    });

    return {weeks: weeks};
  }
});
