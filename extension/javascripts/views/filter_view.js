FilterView = Backbone.View.extend({
  initialize: function() {
    $(this.el).html('').hide();
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
  },

  renderTimeVisits: function(pageVisits) {
    var timeVisitView;
    $.each(groupPageVisits(pageVisits).models, function(i, dateVisit) {
      $.each(dateVisit.get('timeVisits').models, function(i, timeVisit) {
        timeVisitView = new TimeVisitView({
          model: timeVisit,
          collection: timeVisit.get('pageVisits')
        });
        $('.content').append(timeVisitView.render().el);
      });
    });
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
