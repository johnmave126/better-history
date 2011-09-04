TimeVisitView = Backbone.View.extend({
  tagName: 'div',
  className: 'time_visit_view',

  render: function() {
    $('#timeVisitTemplate').tmpl(this.model.presenter()).appendTo(this.el);
    this.renderVisits();
    return this;
  },

  renderVisits: function() {
    var pageVisits = this.model.get('pageVisits');

    if(pageVisits.length > 0) {
      var self = this;
      $.each(pageVisits, function(i, pageVisit) {
        var method = (pageVisit.length !== undefined ? 'renderGroupedVisits' : 'renderPageVisit');
        self[method](pageVisit);
      });
    }
  },

  renderGroupedVisits: function(groupedVisits) {
    var groupedVisitsView = new GroupedVisitsView({collection: groupedVisits});
    this.appendVisits(groupedVisitsView.render().el);
  },

  renderPageVisit: function(pageVisit) {
    var pageVisitView = new PageVisitView({model: pageVisit});
    this.appendVisits(pageVisitView.render().el);
  },

  appendVisits: function(visits) {
    $('.visits', this.el).append(visits);
  }
});
