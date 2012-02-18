DateRanger = {
  numberToDay: function(number) {
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[number];
  },

  numberToMonth: function(number) {
    var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
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
      date: Helpers.formatFormalDate(start) 
    };
  }
};
