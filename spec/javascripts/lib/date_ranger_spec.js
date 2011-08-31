describe('DateRanger', function() {
  describe('.beginningOfDay', function() {
    it('sets the hours to 0', function() {
      var start = DateRanger.beginningOfDay();
      expect(start.getHours()).toEqual(0);
    });

    it('sets the minutes to 0', function() {
      var start = DateRanger.beginningOfDay();
      expect(start.getMinutes()).toEqual(0);
    });

    it('sets the seconds to 0', function() {
      var start = DateRanger.beginningOfDay();
      expect(start.getSeconds()).toEqual(0);
    });
  });

  describe('.endOfDay', function() {
    it('sets the hours to 23', function() {
      var start = DateRanger.endOfDay();
      expect(start.getHours()).toEqual(23);
    });

    it('sets the minutes to 59', function() {
      var start = DateRanger.endOfDay();
      expect(start.getMinutes()).toEqual(59);
    });

    it('sets the seconds to 59', function() {
      var start = DateRanger.endOfDay();
      expect(start.getSeconds()).toEqual(59);
    });
  });

  describe('.today', function() {
    it('returns date ranges for today', function() {
      var range = DateRanger.today();
      var date = new Date().getDate();
      expect(range.start.getDate()).toEqual(date);
      expect(range.end.getDate()).toEqual(date);
    });
  });

  describe('.yesterday', function() {
    it('returns date ranges for yesterday', function() {
      var range = DateRanger.yesterday();
      var date = new Date().getDate() - 1;
      expect(range.start.getDate()).toEqual(date);
      expect(range.end.getDate()).toEqual(date);
    });
  });

  describe('.dayBefore', function() {
    it('returns date ranges for the day before yesterday', function() {
      var range = DateRanger.dayBefore();
      var date = new Date().getDate() - 2;
      expect(range.start.getDate()).toEqual(date);
      expect(range.end.getDate()).toEqual(date);
    });
  });

  describe('.threeDaysAgo', function() {
    it('returns date ranges for 3 days ago', function() {
      var range = DateRanger.threeDaysAgo();
      var date = new Date().getDate() - 3;
      expect(range.start.getDate()).toEqual(date);
      expect(range.end.getDate()).toEqual(date);
    });
  });

  describe('.fourDaysAgo', function() {
    it('returns date ranges for 4 days ago', function() {
      var range = DateRanger.fourDaysAgo();
      var date = new Date().getDate() - 4;
      expect(range.start.getDate()).toEqual(date);
      expect(range.end.getDate()).toEqual(date);
    });
  });

  describe('.fiveDaysAgo', function() {
    it('returns date ranges for 5 days ago', function() {
      var range = DateRanger.fiveDaysAgo();
      var date = new Date().getDate() - 5;
      expect(range.start.getDate()).toEqual(date);
      expect(range.end.getDate()).toEqual(date);
    });
  });

  describe('.sixDaysAgo', function() {
    it('returns date ranges for 6 days ago', function() {
      var range = DateRanger.sixDaysAgo();
      var date = new Date().getDate() - 6;
      expect(range.start.getDate()).toEqual(date);
      expect(range.end.getDate()).toEqual(date);
    });
  });

  describe('.sevenDaysAgo', function() {
    it('returns date ranges for 7 days ago', function() {
      var range = DateRanger.sevenDaysAgo();
      var date = new Date().getDate() - 7;
      expect(range.start.getDate()).toEqual(date);
      expect(range.end.getDate()).toEqual(date);
    });
  });
});
