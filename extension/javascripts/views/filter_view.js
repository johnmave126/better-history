FilterView = Backbone.View.extend({
  className: 'filter_view',

  render: function() {
    $('#filterTemplate').tmpl(this.model.toJSON()).appendTo(this.el);

    var self = this;
    PageVisit.search(self.model.options(), function(results) {
      $('.content', self.el).fadeOut(200, function() {
        $(this).html('');
        if(results.length === 0) {
          self.renderNoResults();
        } else {
          self.renderPageVisits(results);
        }
        self.presentContent();
      });
    });
    return this;
  },

  renderNoResults: function () {
    $('#noVisitsTemplate').tmpl().appendTo($('.content', this.el));
  },

  renderPageVisits: function(results) {
    var self = this;
    dateVisits = groupResults(results);
    $.each(dateVisits.models, function(i, dateVisit) {
      $.each(dateVisit.get('timeVisits').models, function(i, timeVisit) {
        var timeVisitView = new TimeVisitView({model: timeVisit});
        $('.content', self.el).append(timeVisitView.render().el);
      });
    });
  },

  stickHeaders: function(container) {
    $(container).find('.time_visit_view').stickySectionHeaders({
      stickyClass:'time_interval', padding:48
    });
  },

  dragify: function(selector) {
    $(selector).draggable({
      revert: 'invalid',
      revertDuration: 200,
      helper: 'clone',
      appendTo: 'body',
      handle: '.handle',
      zIndex: 1000
    });
  },

  presentContent: function() {
    var self = this;
    $('.content', self.el).show('slide', {direction:'left'}, 350, function() {
      self.stickHeaders($('.content', self.el));
      self.dragify('.page_visit, .grouped_visits');
    });
  }
});
