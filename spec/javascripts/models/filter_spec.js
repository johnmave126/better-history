describe('Filter', function() {
  var filter, options;

  beforeEach(function() {
    options = {
      daysSinceToday: 0,
      startTime: new Date().getTime(),
      endTime: new Date().getTime()
    };
    filter = new Filter(options);
  });

  describe('#initialize', function() {
    it('sets the hash', function() {
      expect(filter.get('hash')).toEqual(0 + '_days_ago');
    });

    it('sets a special title if filter is for search', function() {
      options.hash = 'search';
      filter = new Filter(options);
      expect(filter.get('title')).toEqual('Searching ""');
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

    it('sets a special title if the date is older than yesterday', function() {
      var borders = DateRanger.borders(2);
      filter = new Filter({
        daysSinceToday: 2,
        startTime: borders.start.getTime(),
        endTime: borders.end.getTime()
      });

      expect(filter.get('title')).toContain('<span class="ordinal" >');
    });
  });

  describe('#sync', function() {
    beforeEach(function() {
      spyOn(chromeAPI.history, 'search');
    });

    it('does not call to the Chrome API wrapper when the method is not read', function() {
      filter.sync('write', filter, {});
      expect(chromeAPI.history.search).not.toHaveBeenCalled();
    });

    it('calls to Chrome API wrapper if the the method is read', function() {
      filter.sync('read', filter, {});
      expect(chromeAPI.history.search).toHaveBeenCalledWith(filter.options(), jasmine.any(Function));
    });
  });

  describe('#date', function() {
    it('returns the date as a date object', function() {
      expect(filter.date()).toEqual(new Date());
    });
  });

  describe('#ordinal', function() {
    it('return st if the date is 1, 21, or 31', function() {
      var ordinal = 'st';

      filter.set({startTime: new Date('1/1/10')});
      expect(filter.ordinal()).toEqual(ordinal);

      filter.set({startTime: new Date('1/21/10')});
      expect(filter.ordinal()).toEqual(ordinal);

      filter.set({startTime: new Date('1/31/10')});
      expect(filter.ordinal()).toEqual(ordinal);
    });

    it('returns nd if the date is 2 or 22', function() {
      var ordinal = 'nd';

      filter.set({startTime: new Date('1/2/10')});
      expect(filter.ordinal()).toEqual(ordinal);

      filter.set({startTime: new Date('1/22/10')});
      expect(filter.ordinal()).toEqual(ordinal);
    });

    it('returns rd if the date is 3 or 23', function() {
      var ordinal = 'rd';

      filter.set({startTime: new Date('1/3/10')});
      expect(filter.ordinal()).toEqual(ordinal);

      filter.set({startTime: new Date('1/23/10')});
      expect(filter.ordinal()).toEqual(ordinal);

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
  });

  describe('#buildSearchTitle', function() {
    it('joins the search terms into a title', function() {
      expect(filter.buildSearchTitle('testing here')).toEqual('Searching "testing" and "here"');
    });
  });

  describe('#searching', function() {
    it('returns true when the filter has a hash of search', function() {
      filter.set({hash: 'search'});
      expect(filter.searching()).toBeTruthy();
    });

    it('returns false when the filter has a hash not of search', function() {
      expect(filter.searching()).toBeFalsy();
    });
  });

  describe('#parse', function() {
    it('returns PageVisits when searching', function() {
      filter.set({hash: 'search'});
      filter.parse({});
      expect(filter.get('history') instanceof PageVisits).toBeTruthy();
    });

    it('returns TimeVisits when not searching', function() {
      filter.parse({});
      expect(filter.get('history') instanceof TimeVisits).toBeTruthy();
    });
  });
});
