DateRanger = {
  week: function() {
    var start = new Date(),
        end = new Date();

    start.setDate(start.getDate() - 7);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);

    return {start: start, end: end};
  },
  yesterday: function() {
    var start = new Date(),
        end = new Date();

    start.setDate(start.getDate() - 1);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    end.setDate(end.getDate() - 1);
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);

    return {start: start, end: end};
  },
  today: function() {
    var start = new Date(),
        end = new Date();

    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);

    return {start: start, end: end};
  }
}
