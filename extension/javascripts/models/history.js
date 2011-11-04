History = Backbone.Model.extend({
  parse:function(data) {
    this.timeVisits = new TimeVisits();

    var self = this;
    $.each(data, function(i, timeVisit) {
      var visits = [];
      $.each(timeVisit.visits, function(i, visit) {
        if(visit.length === undefined) {
          visits.push(new PageVisit(visit));
        } else {
          var groupedVisits = new GroupedVisits();
          $.each(visit, function(i, pageVisit) {
            groupedVisits.add(pageVisit);
          });
          visits.push(groupedVisits);
        }
      });
      self.timeVisits.add({time:timeVisit.time, visits: visits});
      return data;
    });
  }
});
