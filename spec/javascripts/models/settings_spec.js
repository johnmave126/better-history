describe('Settings', function() {
  var settings;

  beforeEach(function() {
    settings = new Settings();
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
      expect(settings.timeGrouping()).toEqual(settings.defaults.timeGrouping);
    });
  });

  describe('#timeFormat', function() {
    it('returns a parsed int of timeFormat', function() {
      settings.set({timeFormat: '12'});
      expect(settings.timeFormat()).toEqual(settings.defaults.timeFormat);
    });
  });

  describe('#sync', function() {
    var callback;

    beforeEach(function() {
      localStorage.settings = {};
      callback = jasmine.createSpy('callback');
    });

    describe('when method is create', function() {
      it('stores the settings in localStorage as json', function() {
        settings.sync('create', settings, {success: callback});
        expect(localStorage.settings).toEqual(JSON.stringify(settings));
      });

      it('calls the success callback', function() {
        settings.sync('create', settings, {success: callback});
        expect(callback).toHaveBeenCalledWith(settings);
      });
    });

    describe('when method id read', function() {
      it('calls the success callback with parsed settings from localStorage', function() {
        settings.sync('create', settings, {success: callback});
        settings.sync('read', settings, {success: callback});
        expect(callback).toHaveBeenCalledWith(settings.toJSON());
      });
    });
  });

  describe('#parse', function() {
    it('passes json to set method', function() {
      var attributes = {timeGrouping: 50, domainGrouping: false, timeFormat: 24, searchByDomain: false, searchBySelection: false};
      settings.parse(attributes);
      expect(settings.toJSON()).toEqual(attributes);
    });
  });
});
