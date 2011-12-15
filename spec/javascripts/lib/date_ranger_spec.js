describe('DateRanger', function() {
  describe('.numberToDay', function() {
    it('returns Sunday when passed 0', function() {
      expect(DateRanger.numberToDay(0)).toEqual('sunday');
    });

    it('returns Wednesday when passed 3', function() {
      expect(DateRanger.numberToDay(3)).toEqual('wednesday');
    });

    it('returns Saturday when passed 6', function() {
      expect(DateRanger.numberToDay(6)).toEqual('saturday');
    });
  });

  describe('.numberToMonth', function() {
    it('returns January when passed 0', function() {
      expect(DateRanger.numberToMonth(0)).toEqual('january');
    });

    it('returns June when passed 5', function() {
      expect(DateRanger.numberToMonth(5)).toEqual('june');
    });

    it('returns December when passed 11', function() {
      expect(DateRanger.numberToMonth(11)).toEqual('december');
    });
  });

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

  describe('.borders', function() {
    var pastDate;

    beforeEach(function() {
      var date = new Date();
      pastDate = function(day) {
        return new Date(date.setDate(date.getDate() - day)).getDate();
      };
    });

    it('returns date ranges for yesterday', function() {
      var range = DateRanger.borders(1),
          date = pastDate(1);
      expect(range.start.getDate()).toEqual(date);
      expect(range.end.getDate()).toEqual(date);
    });
  });
});
