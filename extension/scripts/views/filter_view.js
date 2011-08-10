FilterView = Backbone.View.extend({
  initialize: function() {
    $(this.el).html('').hide();
  },

  render: function(results) {
    var self = this;
    $('#filterViewTemplate').tmpl(this.model.toJSON()).appendTo(this.el);
    $(this.el).fadeIn();
    var history = $(document.createElement('div'));

    Visit.search(self.model.options(), function(results) {
      results = groupResults(results);
      for(date in results) {
        var dateSection = $('#dateTemplate').tmpl({date:date});
        for(time in results[date]) {
          if(results[date].hasOwnProperty(time)) {
            var timeSection = $('#timeTemplate').tmpl({time:time}).appendTo(dateSection);
            $.each(results[date][time], function(i, visit) {
              if(isArray(visit)) {
                var groupedVisitsView = new GroupedVisitsView({collection: visit});
                $(timeSection).append(groupedVisitsView.render().el);
              } else {
                var visitView = new VisitView({model: visit});
                $(timeSection).append(visitView.render().el);
              }
            });
            $(history).append(dateSection);
          }
        }
      }
      $('.content', self.el).hide("fast", function() {
        $('.content', self.el).html(history).show("fast", function() {
          self.stickHeaders(self.el);
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
