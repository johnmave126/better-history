describe('Filter', function() {
  var filter, options;

  beforeEach(function() {
    loadChromeAPI();
    options = {
      daysSinceToday: 0,
      startTime: new Date("december 1, 2011").getTime(),
      endTime: new Date("december 1, 2011").getTime()
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

      expect(filter.get('title')).toContain('informal date');
    });

    it('sets the assembled formal date', function() {
      expect(filter.get('formal_date')).toBeDefined();
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

  describe('#destroyHistory', function() {
    it('calls to chrome\'s history api with start and end time and passed callback', function() {
      chrome = {history: {deleteRange: jasmine.createSpy('deleteRange')}};
      var callback = jasmine.createSpy('callback');

      filter.destroyHistory(callback);

      expect(chrome.history.deleteRange).toHaveBeenCalledWith({
        endTime: filter.get('endTime'),
        startTime: filter.get('startTime')
      }, callback);
    });
  });


  describe('#date', function() {
    it('returns the date as a date object', function() {
      expect(filter.date()).toEqual(new Date("december 1, 2011"));
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

  describe('#toTemplate', function() {
    it('returns the properties on the model', function() {
      spyOn(filter, 'toJSON').andReturn({json: 'properties'});
      var properties = filter.toTemplate();
      expect(properties.json).toEqual('properties');
    });

    it('includes the cid in the properties', function() {
      var properties = filter.toTemplate();
      expect(properties.cid).toBeDefined();
    });

    it('merges in filter i18n properties when the hash is not search', function() {
      filter.set({hash: 'not_search'});
      var properties = filter.toTemplate();
      expect(properties.i18n_no_visits_found).toBeDefined();
    });

    it('merges in search i18n properties when the hash is search', function() {
      filter.set({hash: 'search'});
      var properties = filter.toTemplate();
      expect(properties.i18n_search_time_frame).toBeDefined();
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
