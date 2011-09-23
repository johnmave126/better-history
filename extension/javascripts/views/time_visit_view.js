TimeVisitView = Backbone.View.extend({
  tagName: 'div',
  className: 'time_visit_view',

  events: {
    'click .time_interval': 'toggleStateClicked'
  },

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
  },

  toggleStateClicked: function(ev) {
    if(!$(ev.currentTarget).hasClass('stuck')) {
      var self = this;
      $(this.el).find('.visits').slideToggle('fast', function() {
        self.toggleState();
      });
    }
  },

  toggleState: function() {
    var element = $(this.el).children('.state');
    $(element).toggleClass('expanded').toggleClass('collapsed');

    var newState = ($(element).hasClass('expanded') ? 'expanded' : 'collapsed');
    this.model.setState(newState);
  }
});
