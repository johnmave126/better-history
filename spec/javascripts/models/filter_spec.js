describe('Filter', function() {
  var filter;

  beforeEach(function() {
    filter = new Filter({
      startTime: new Date().getTime(),
      endTime: new Date().getTime()
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

  describe('#toJSONWithCID', function() {
    it('returns the properties plus the cid', function() {
      jsonFilter = filter.toJSONWithCID();
      expect(jsonFilter.startTime).toBeDefined();
      expect(jsonFilter.endTime).toBeDefined();
      expect(jsonFilter.cid).toBeDefined();
    });
  });
});
