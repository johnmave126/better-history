describe('DateRanger', function() {
  describe('.numberToDay', function() {
    it('returns Sunday when passed 0', function() {
      expect(DateRanger.numberToDay(0)).toEqual('Sunday');
    });

    it('returns Monday when passed 1', function() {
      expect(DateRanger.numberToDay(1)).toEqual('Monday');
    });

    it('returns Tuesday when passed 2', function() {
      expect(DateRanger.numberToDay(2)).toEqual('Tuesday');
    });

    it('returns Wednesday when passed 3', function() {
      expect(DateRanger.numberToDay(3)).toEqual('Wednesday');
    });

    it('returns Thursday when passed 4', function() {
      expect(DateRanger.numberToDay(4)).toEqual('Thursday');
    });

    it('returns Friday when passed 5', function() {
      expect(DateRanger.numberToDay(5)).toEqual('Friday');
    });

    it('returns Saturday when passed 6', function() {
      expect(DateRanger.numberToDay(6)).toEqual('Saturday');
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

  describe('creating past dates', function() {
    var pastDate;

    beforeEach(function() {
      var date = new Date();
      pastDate = function(day) {
        return new Date(date.setDate(date.getDate() - day)).getDate();
      };
    });

    describe('.today', function() {
      it('returns date ranges for today', function() {
        var range = DateRanger.today(),
            date = pastDate(0);

        expect(range.start.getDate()).toEqual(date);
        expect(range.end.getDate()).toEqual(date);
      });
    });

    describe('.yesterday', function() {
      it('returns date ranges for yesterday', function() {
        var range = DateRanger.yesterday(),
            date = pastDate(1);

        expect(range.start.getDate()).toEqual(date);
        expect(range.end.getDate()).toEqual(date);
      });
    });

    describe('.twoDaysAgo', function() {
      it('returns date ranges for 2 days ago', function() {
        var range = DateRanger.twoDaysAgo(),
            date = pastDate(2);

        expect(range.start.getDate()).toEqual(date);
        expect(range.end.getDate()).toEqual(date);
      });
    });

    describe('.threeDaysAgo', function() {
      it('returns date ranges for 3 days ago', function() {
        var range = DateRanger.threeDaysAgo(),
            date = pastDate(3);

        expect(range.start.getDate()).toEqual(date);
        expect(range.end.getDate()).toEqual(date);
      });
    });

    describe('.fourDaysAgo', function() {
      it('returns date ranges for 4 days ago', function() {
        var range = DateRanger.fourDaysAgo(),
            date = pastDate(4);

        expect(range.start.getDate()).toEqual(date);
        expect(range.end.getDate()).toEqual(date);
      });
    });

    describe('.fiveDaysAgo', function() {
      it('returns date ranges for 5 days ago', function() {
        var range = DateRanger.fiveDaysAgo(),
            date = pastDate(5);

        expect(range.start.getDate()).toEqual(date);
        expect(range.end.getDate()).toEqual(date);
      });
    });

    describe('.sixDaysAgo', function() {
      it('returns date ranges for 6 days ago', function() {
        var range = DateRanger.sixDaysAgo(),
            date = pastDate(6);

        expect(range.start.getDate()).toEqual(date);
        expect(range.end.getDate()).toEqual(date);
      });
    });

    describe('.twoMonthsAgo', function() {
      it('returns date ranges for 60 days ago', function() {
        var range = DateRanger.twoMonthsAgo(),
            date = pastDate(60);

        expect(range.start.getDate()).toEqual(date);
        expect(range.end.getDate()).toEqual(date);
      });
    });
  });
});
