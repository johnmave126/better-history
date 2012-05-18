var DefaultFilters = {
  fetch: function() {
    var today = DateRanger.borders(0),
        yesterday = DateRanger.borders(1),
        twoDaysAgo = DateRanger.borders(2),
        threeDaysAgo = DateRanger.borders(3),
        fourDaysAgo = DateRanger.borders(4),
        fiveDaysAgo = DateRanger.borders(5),
        sixDaysAgo = DateRanger.borders(6),
        sevenDaysAgo = DateRanger.borders(7);

    var filters = new Filters();
    $.each([0,1,2,3,4,5,6,7,8,9,10,11,12,13], function(i) {
      var borders = DateRanger.borders(i);

      filters.add({
        daysSinceToday: i,
        startTime: borders.start.getTime(),
        endTime: borders.end.getTime()
      });
    });
    return filters;
  }
};
