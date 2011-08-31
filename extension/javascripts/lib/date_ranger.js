DateRanger = {
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

  sevenDaysAgo: function() {
    var start = this.beginningOfDay(),
        end = this.endOfDay();

    start.setDate(start.getDate() - 7);
    end.setDate(end.getDate() - 7);

    return this.wrap(start, end);
  },

  sixDaysAgo: function() {
    var start = this.beginningOfDay(),
        end = this.endOfDay();

    start.setDate(start.getDate() - 6);
    end.setDate(end.getDate() - 6);

    return this.wrap(start, end);
  },

  fiveDaysAgo: function() {
    var start = this.beginningOfDay(),
        end = this.endOfDay();

    start.setDate(start.getDate() - 5);
    end.setDate(end.getDate() - 5);

    return this.wrap(start, end);
  },

  fourDaysAgo: function() {
    var start = this.beginningOfDay(),
        end = this.endOfDay();

    start.setDate(start.getDate() - 4);
    end.setDate(end.getDate() - 4);

    return this.wrap(start, end);
  },

  threeDaysAgo: function() {
    var start = this.beginningOfDay(),
        end = this.endOfDay();

    start.setDate(start.getDate() - 3);
    end.setDate(end.getDate() - 3);

    return this.wrap(start, end);
  },

  dayBefore: function() {
    var start = this.beginningOfDay(),
        end = this.endOfDay();

    start.setDate(start.getDate() - 2);
    end.setDate(end.getDate() - 2);

    return this.wrap(start, end);
  },

  yesterday: function() {
    var start = this.beginningOfDay(),
        end = this.endOfDay();

    start.setDate(start.getDate() - 1);
    end.setDate(end.getDate() - 1);

    return this.wrap(start, end);
  },

  today: function() {
    var start = this.beginningOfDay(),
        end = this.endOfDay();

    return this.wrap(start, end);
  },

  wrap: function(start, end) {
    return {start: start, end: end};
  }
};
