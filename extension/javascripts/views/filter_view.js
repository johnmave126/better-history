FilterView = Backbone.View.extend({

  events: {
    'click .collapse_groupings': 'collapseGroupings',
    'click .expand_groupings': 'expandGroupings'
  },

  initialize: function() {
    $(this.el).html('').hide();
  },

  collapseGroupings: function(ev) {
    ev.preventDefault();
    $.each(this.collection.models, function(i, timeVisit) {
      timeVisit.trigger('collapse');
    });
  },

  expandGroupings: function(ev) {
    ev.preventDefault();
    $.each(this.collection.models, function(i, timeVisit) {
      timeVisit.trigger('expand');
    });
  },

  render: function(type) {
    $('#filterTemplate').tmpl(this.model.presenter()).appendTo(this.el);
    $('.view', this.el).addClass(this.model.get('hash'));

    var self = this;
    $(this.el).fadeIn('fast', function() {
      $('.spinner').spin();
      PageVisit.search(self.model.options(), function(results) {
        self.renderAppropriate(results);
      });
    });

    return this;
  },

  setVisitCount: function(amount) {
    this.visitCount = amount;
    this.updateVisitCount(amount);
  },

  updateVisitCount: function(amount) {
    $('.visit_count', this.el).text(amount + ' visits').fadeIn();
  },

  visitRemoved: function() {
    this.visitCount--;
    this.updateVisitCount(this.visitCount);
  },

  renderAppropriate: function(results) {
    $('.content', this.el).html('');
    if(results.length === 0) {
      this.renderNoResults();
    } else {
      if(this.model.get('hash') === 'search') {
        this.renderPageVisits(results);
      } else {
        this.renderTimeVisits(results);
      }
    }
    this.update();
  },

  renderNoResults: function () {
    $('#noVisitsTemplate').tmpl().appendTo($('.content', this.el));
    this.setVisitCount(0);
  },

  renderTimeVisits: function(pageVisits) {
    var timeVisitView, visitCount = 0;
    var self = this;
    $.each(groupPageVisits(pageVisits).models, function(i, dateVisit) {
      self.collection = dateVisit.get('timeVisits');
      $.each(self.collection.models, function(i, timeVisit) {
        timeVisit.get('pageVisits').bind('destroy', self.visitRemoved, self);
        timeVisitView = new TimeVisitView({
          model: timeVisit,
          collection: timeVisit.get('pageVisits')
        });
        visitCount += timeVisit.get('pageVisits').length;
        $('.content').append(timeVisitView.render().el);
      });
    });
    this.setVisitCount(visitCount);
  },

  renderPageVisits: function(pageVisits) {
    var pageVisitView;
    $.each(pageVisits.models, function(i) {
      pageVisitView = new PageVisitView({model: this});
      $('.content').append(pageVisitView.render().el);
    });
  },

  update: function() {
    $('.time_visit_view').stickySectionHeaders({
      stickyClass:'time_interval',
      padding:48
    });
  }
});
