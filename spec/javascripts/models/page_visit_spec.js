chrome = {};

describe('PageVisit', function() {
  var properties, pageVisit;

  beforeEach(function() {
    properties = {
      title: 'test',
      lastVisitTime: new Date(),
      url: 'http://google.com/page/'
    };
    pageVisit = new PageVisit(properties);
  });

  describe('#initialize', function() {
    it('assigns a default title if the title is empty', function() {
      var aPageVisit = new PageVisit({
        title: '',
        lastvisitTime: new Date(),
        url: 'address'
      });
      expect(aPageVisit.get('title')).toEqual(aPageVisit.defaults.title);
    });
  });

  describe('#presenter', function() {
    it('returns all the properties used in the view', function() {
      var presentedProperties = properties;
      presentedProperties.cid = pageVisit.cid;
      expect(pageVisit.presenter()).toEqual(presentedProperties);
    });
  });

  describe('#domain', function() {
    it('returns the domain when a domain exists in the url', function() {
      expect(pageVisit.domain()).toEqual('http://google.com/');
    });

    it('returns null when the url does not have a domain', function() {
      pageVisit.set({url: 'http://localhost/~roykolak'});
      expect(pageVisit.domain()).toEqual('http://localhost/');
    });
  });

  describe('#compare', function() {
    it('returns true when the domains are the same', function() {
      var aPageVisit = new PageVisit({
        title: 'a pageVisit',
        lastvisitTime: new Date(),
        url: properties.url + 'something/else'
      });
      expect(pageVisit.compare(aPageVisit)).toEqual(true);
    });

    it('returns false when the domains are different', function() {
      var aPageVisit = new PageVisit({
        title: 'a pageVisit',
        lastvisitTime: new Date(),
        url: 'http://something.com/else'
      });
      expect(pageVisit.compare(aPageVisit)).toEqual(false);
    });
  });

  describe('#destroy', function() {
    beforeEach(function() {
      chrome.history = { deleteUrl: jasmine.createSpy('deleteUrl') };
    });
    it('calls to the chrome history api with the url', function() {
      pageVisit.destroy();
      expect(chrome.history.deleteUrl).toHaveBeenCalledWith({url: pageVisit.get('url')});
    });
  });

  describe('.search', function() {
    var options;

    beforeEach(function() {
      spyOn(chromeAPI.history, 'search');
      options = 'the options';
    });

    it('calls to the custom chrome API search method', function() {
      PageVisit.search(options, function(){});
      expect(chromeAPI.history.search).toHaveBeenCalledWith(options, jasmine.any(Function));
    });
  });
});
