FilterView = Backbone.View.extend({
  initialize: function() {
    $(this.el).html('').hide();
  },

  render: function(results) {
    var self = this;
    $('#filterViewTemplate').tmpl(this.model.toJSON()).appendTo($(this.el));
    $(this.el).fadeIn("fast", function() {
      Visit.search(self.model.options(), function(results) {
        dateVisits = groupResults(results);
        $.each(dateVisits.models, function(i, dateVisit) {
          var dateVisitView = new DateVisitView({model: dateVisit});
          $(self.el).append(dateVisitView.render().el);
        });
        $('.content', self.el).hide("fast", function() {
          $('.content', self.el).html(history).show("fast", function() {
            //self.stickHeaders(self.el);
          });
        });
      });
    });
  },

  stickHeaders: function(container) {
    $(container).find('section').stickySectionHeaders({
      stickyClass:'date_interval', padding:48
    });
    $(container).find('section > div').stickySectionHeaders({
      stickyClass:'time_interval', padding:48
    });
    $(window).scrollTop(40);
  }
});
