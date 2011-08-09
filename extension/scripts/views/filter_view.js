FilterView = Backbone.View.extend({
  initialize: function() {
    $(this.el).html('');
  },

  render: function(results) {
    var html = $('#filterViewTemplate').tmpl(this.model.toJSON());

    var self = this;
    Visit.search(this.model.options(), function(results) {
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
            $('.content', html).append(dateSection);
          }
        }
      }
      $(html).appendTo(self.el).show("fast", function() {
        self.stickHeaders(self.el);
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
