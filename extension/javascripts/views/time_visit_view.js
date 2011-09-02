TimeVisitView = Backbone.View.extend({
  tagName: 'div',
  className: 'time_visit_view',

  events: {
    'click .time_interval': 'toggleVisits'
  },

  render: function() {
    $('#timeVisitTemplate').tmpl(this.model.toJSON()).appendTo(this.el);
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
          $('.visits', self.el).append(groupedVisitsView.render().el);
        } else {
          var pageVisitView = new PageVisitView({model: pageVisit});
          $('.visits', self.el).append(pageVisitView.render().el);
        }
      });
    }
  },

  toggleVisits: function(ev) {
    $(ev.currentTarget).next().slideToggle("fast");
  }
});
