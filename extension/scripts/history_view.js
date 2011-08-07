function stickHeaders(container) {
  $(container).find('section').stickySectionHeaders({
    stickyClass:'date_interval', padding:48
  });
  $(container).find('section > div').stickySectionHeaders({
    stickyClass:'time_interval', padding:48
  });
  $(window).scrollTop(40);
}

HistoryView = Backbone.View.extend({
  render: function() {
    for(date in this.collection) {
      var dateSection = $('#dateTemplate').tmpl({date:date});
      for(time in this.collection[date]) {
        if(this.collection[date].hasOwnProperty(time)) {
          var timeSection = $('#timeTemplate').tmpl({time:time}).appendTo(dateSection);
          $.each(this.collection[date][time], function(i, visit) {
            if(isArray(visit)) {
              var groupedVisitsView = new GroupedVisitsView({collection: visit});
              $(timeSection).append(groupedVisitsView.render().el);
            } else {
              var visitView = new VisitView({model: visit});
              $(timeSection).append(visitView.render().el);
            }
          });
          $(this.el).append(dateSection);
        }
      }
    }
    return this;
  }
});
