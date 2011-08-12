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
    var pageVisits = this.model.get('pageVisits');
    if(pageVisits.length > 0) {
      $.each(pageVisits, function(i, pageVisit) {
        if(pageVisit.length !== undefined) {
          var groupedVisitsView = new GroupedVisitsView({collection: pageVisit});
          $(self.el).append(groupedVisitsView.render().el);
        } else {
          var visitView = new VisitView({model: pageVisit});
          $(self.el).append(visitView.render().el);
        }
      });
    }
  }
});
