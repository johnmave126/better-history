describe('Settings', function() {
  var settings;

  beforeEach(function() {
    loadChromeAPI();
    settings = new Settings();
  });

  it('sets a store name', function() {
    expect(settings.storeName).toEqual('settings');
  });

  describe('#initialize', function() {
    it('defaults timeGrouping when not supplied', function() {
      expect(settings.get('timeGrouping')).toEqual(15);
    });

    it('defaults timeFormat when not supplied', function() {
      expect(settings.get('timeFormat')).toEqual(12);
    });

    it('defaults domainGrouping when not supplied', function() {
      expect(settings.get('domainGrouping')).toBeTruthy();
    });

    it('defaults searchByDomain when not supplied', function() {
      expect(settings.get('searchByDomain')).toBeTruthy();
    });

    it('defaults searchBySelection when not supplied', function() {
      expect(settings.get('searchBySelection')).toBeTruthy();
    });
  });

  describe('#timeGrouping', function() {
    it('returns a parsed int of timeGrouping', function() {
      settings.set({timeGrouping: '15'});
      expect(settings.timeGrouping()).toEqual(settings.defaults().timeGrouping);
    });
  });

  describe('#timeFormat', function() {
    it('returns a parsed int of timeFormat', function() {
      settings.set({timeFormat: '12'});
      expect(settings.timeFormat()).toEqual(settings.defaults().timeFormat);
    });
  });

  describe('#parse', function() {
    it('passes json to set method', function() {
      var attributes = "{timeGrouping: 50, domainGrouping: false}";
      settings.parse(attributes);
      expect(settings.toJSON()).toEqual({
        timeGrouping: 50,
        domainGrouping: false
      });
    });
  });
});
