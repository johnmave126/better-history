FilterView = Backbone.View.extend({
  initialize: function() {
    $(this.el).addClass(this.model.get('hash')).html('').hide();
  },

  render: function(type) {
    $('#filterTemplate').tmpl(this.model.toJSON()).appendTo(this.el);

    var self = this;
    $(this.el).fadeIn('fast', function() {
      PageVisit.search(self.model.options(), function(results) {
        self.renderAppropriate(results);
      });
    });

    return this;
  },

  renderAppropriate: function(results) {
    $(this).html('');
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
        timeVisitView = new TimeVisitView({model: timeVisit});
        $('.content').append(timeVisitView.render().el);
      });
    });
  },

  renderPageVisits: function(pageVisits) {
    var pageVisitView;
    $.each(pageVisits.models, function(i, pageVisit) {
      pageVisitView = new PageVisitView({model: pageVisit});
      $('.content').append(pageVisitView.render().el);
    });
  },

  update: function() {
    $('.page_visit, .grouped_visit').draggable({
      revert: 'invalid',
      revertDuration: 200,
      helper: 'clone',
      appendTo: 'body',
      handle: '.handle',
      zIndex: 1000
    });

    $('.time_visit_view').stickySectionHeaders({
      stickyClass:'time_interval',
      padding:48
    });
  }
});
