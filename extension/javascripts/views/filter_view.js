FilterView = Backbone.View.extend({
  initialize: function() {
    $(this.el).html('').hide();
  },

  render: function(type) {
    var self = this;
    $('#filterViewTemplate').tmpl(this.model.toJSON()).appendTo($(this.el));
    $('.spinner').spin();

    $(this.el).fadeIn("fast", function() {
      PageVisit.search(self.model.options(), function(results) {
        $('.content', self.el).html('').hide();
        if(results.length === 0) {
          $('#noVisitsTemplate').tmpl().appendTo($('.content', self.el));
          self.presentContent(type);
        } else {
          dateVisits = groupResults(results);
          $.each(dateVisits.models, function(i, dateVisit) {
            var dateVisitView = new DateVisitView({model: dateVisit});
            $('.content', self.el).append(dateVisitView.render().el);
          });

          self.presentContent(type);
          self.stickHeaders($('.content', self.el));
          self.dragify('.page_visit, .grouped_visits');
        }
      });
    });
  },

  stickHeaders: function(container) {
    $(container).find('.date_visit_view').stickySectionHeaders({
      stickyClass:'date_interval', padding:48
    });
    $(container).find('.time').stickySectionHeaders({
      stickyClass:'time_interval', padding:48
    });
    $(window).scrollTop(40);
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

  presentContent: function(type) {
    if(type === 'search') {
      $('.content', self.el).show();
    } else {
      $('.content', self.el).show('slide', {direction:'left'}, 200);
    }
  }
});
