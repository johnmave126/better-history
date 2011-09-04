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

  describe('#presenter', function() {
    it('returns the properties used in the view', function() {
      var properties = filter.toJSON();
      properties.cid = filter.cid;
      expect(filter.presenter()).toEqual(properties);
    });
  });
});
