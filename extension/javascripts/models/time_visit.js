TimeVisit = Backbone.Model.extend({
  presenter: function() {
    return {
      summary: this.get('pageVisits').length + ' visits',
      time: this.get('time')
    };
  }
});
