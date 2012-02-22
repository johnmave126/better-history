delete(localStorage['versions.1.0.suppress']);

describe('Version', function() {
  var version;

  beforeEach(function() {
    loadChromeAPI();
    version = new Version({version: '1.0'});
  });

  describe('#toTemplate', function() {
    it('returns a merged object with model and i18n properties', function() {
      expect(version.toTemplate()).toEqual({
        visibility: 'show',
        i18n_version_title: 'version title'
      });
    });
  });

  describe('#key', function() {
    it('returns the base key', function() {
      expect(version.key()).toEqual('versions.1.0');
    });
  });

  describe('#setSuppress', function() {
    it('updates the localStorage value when passed true', function() {
      version.setSuppress(true);
      expect(localStorage[version.suppressKey()]).toEqual('true');
    });

    it('deletes the localStorage value when passed false', function() {
      version.setSuppress(false);
      expect(localStorage[version.suppressKey()]).toBeUndefined();
    });

    it('updates the suppress value', function() {
      version.setSuppress(false);
      expect(version.get('suppress')).toEqual(false);
    });
  });

  describe('#suppressKey', function() {
    it('returns the suppress key', function() {
      expect(version.suppressKey()).toEqual(version.key() + '.suppress');
    });
  });
});
