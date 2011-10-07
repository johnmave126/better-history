DateRanger = {
  numberToDay: function(number) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[number];
  },

  numberToMonth: function(number) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[number];
  },

  beginningOfDay: function() {
    date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  },

  endOfDay: function() {
    date = new Date();
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    return date;
  },

  borders: function(days) {
    var start = this.beginningOfDay(),
        end = this.endOfDay();

    start.setDate(start.getDate() - days);
    end.setDate(end.getDate() - days);

    return this.wrap(start, end);
  },

  wrap: function(start, end) {
    return {
      start: start,
      end: end,
      day: this.numberToDay(start.getDay()),
      date: start.toLocaleDateString().match(/([^,]*),(.*)/)[2]
    };
  }
};
