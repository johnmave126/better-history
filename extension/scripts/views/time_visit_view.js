TimeVisitView = Backbone.View.extend({
  tagName: 'div',
  className: 'time',

  render: function() {
    $('#timeTemplate').tmpl(this.model.toJSON()).appendTo(this.el);
    this.renderVisits();
    return this;
  },

  renderVisits: function() {
    var self = this;
    var visits = this.model.get('visits');
    if(visits.length > 0) {
      $.each(visits, function(i, visit) {
        if(visit.length !== undefined) {
          var groupedVisitsView = new GroupedVisitsView({collection: visit});
          $(self.el).append(groupedVisitsView.render().el);
        } else {
          var visitView = new VisitView({model: visit});
          $(self.el).append(visitView.render().el);
        }
      });
    }
  }
});
