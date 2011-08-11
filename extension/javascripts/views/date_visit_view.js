DateVisitView = Backbone.View.extend({
  tagName: 'div',
  className: 'date',

  render: function() {
    $('#dateTemplate').tmpl(this.model.toJSON()).appendTo(this.el);
    this.renderTimes();
    return this;
  },

  renderTimes: function() {
    var self = this;
    var timeVisits = this.model.get('timeVisits');
    if(timeVisits.models.length > 0) {
      $.each(timeVisits.models, function(i, timeVisits) {
        var timeVisitView = new TimeVisitView({model: timeVisits});
        $(self.el).append(timeVisitView.render().el);
      });
    }
  }
});
