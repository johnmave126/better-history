describe('DateRanger', function() {
  var start, end;

  beforeEach(function() {
    start = new Date();
    end = new Date();
  });

  describe('.today', function() {
    beforeEach(function() {
      start.setHours(0)
      start.setMinutes(0)
      start.setSeconds(0)
    });

    it('returns date ranges for today', function() {
      today = DateRanger.today();
      expect(today.start.toUTCString()).toEqual(start.toUTCString());
      expect(today.end.toUTCString()).toEqual(end.toUTCString());
    });
  });

  describe('.yesterday', function() {
    beforeEach(function() {
      start.setDate(start.getDate() - 1)
      start.setHours(0)
      start.setMinutes(0)
      start.setSeconds(0)
      end.setDate(end.getDate() - 1)
      end.setHours(23)
      end.setMinutes(59)
      end.setSeconds(59)
    });

    it('returns date ranges for yesterday', function() {
      var yesterday = DateRanger.yesterday();
      expect(yesterday.start.toUTCString()).toEqual(start.toUTCString());
      expect(yesterday.end.toUTCString()).toEqual(end.toUTCString());
    });
  });

  describe('.week', function() {
    beforeEach(function() {
      start.setDate(start.getDate() - 7)
      start.setHours(0)
      start.setMinutes(0)
      start.setSeconds(0)
    });

    it('returns date ranges for the past 7 days', function() {
      var week = DateRanger.week();
      expect(week.start.toUTCString()).toEqual(start.toUTCString());
      expect(week.end.toUTCString()).toEqual(end.toUTCString());
    });
  });
});
