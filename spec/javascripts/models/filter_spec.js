describe('Filter', function() {
  var filter;

  beforeEach(function() {
    filter = new Filter({
      daysSinceToday: 0,
      startTime: new Date().getTime(),
      endTime: new Date().getTime()
    });
  });

  describe('#initialize', function() {
    it('sets the hash', function() {
      expect(filter.get('hash')).toEqual('day_' + 0);
    });

    it('sets a special title if the date is today', function() {
      expect(filter.get('title')).toEqual('Today');
    });

    it('sets a special title if the date is yesterday', function() {
      var borders = DateRanger.borders(1);
      filter = new Filter({
        daysSinceToday: 1,
        startTime: borders.start.getTime(),
        endTime: borders.end.getTime()
      });

      expect(filter.get('title')).toEqual('Yesterday');
    });

    it('sets a special title if the date is 2 days past', function() {
      var borders = DateRanger.borders(2);
      filter = new Filter({
        daysSinceToday: 2,
        startTime: borders.start.getTime(),
        endTime: borders.end.getTime()
      });

      expect(filter.get('title')).toEqual(DateRanger.numberToDay(filter.date().getDay()));
    });

    it('sets a special title if the date is 6 days past', function() {
      var borders = DateRanger.borders(6);
      filter = new Filter({
        daysSinceToday: 6,
        startTime: borders.start.getTime(),
        endTime: borders.end.getTime()
      });

      expect(filter.get('title')).toEqual(DateRanger.numberToDay(filter.date().getDay()));
    });

    it('sets a special title if the date is 7 days past', function() {
      var borders = DateRanger.borders(7);
      filter = new Filter({
        daysSinceToday: 7,
        startTime: borders.start.getTime(),
        endTime: borders.end.getTime()
      });

      expect(filter.get('title')).toEqual('Last ' + DateRanger.numberToDay(filter.date().getDay()));
    });
  });

  describe('#date', function() {
    it('returns the date as a date object', function() {
      expect(filter.date()).toEqual(new Date());
    });
  });

  describe('#options', function() {
    it('returns the filter options', function() {
      var options = filter.options();

      expect(options.text).toBeDefined();
      expect(options.maxResults).toBeDefined();
      expect(options.startTime).toBeDefined();
      expect(options.endTime).toBeDefined();
    });
  });

  describe('#presenter', function() {
    it('returns the properties used in the view', function() {
      var properties = filter.toJSON();
      properties.cid = filter.cid;
      properties.date = filter.date().toLocaleDateString().match(/([^,]*),(.*)/)[2];
      expect(filter.presenter()).toEqual(properties);
    });

    it('joins the search terms when the hash is "search"', function() {
      filter = new Filter({
        text: 'testing search',
        hash: 'search',
        date: 'All history',
        startTime: 0
      });

      expect(filter.presenter().title).toEqual('Searching "testing" and "search"');
    });
  });
});
