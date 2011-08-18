chrome = {};

describe('PageVisit', function() {
  var properties, pageVisit;

  beforeEach(function() {
    properties = {
      title: 'test',
      lastvisitTime: new Date(),
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
    var options, callback, results;

    beforeEach(function() {
      options = {
        test: 'option'
      };
      results = 'parsed results';
      callback = jasmine.createSpy('callback');
      chrome.history = {
        search: jasmine.createSpy('search').andCallFake(function(options, callback) {
          callback(results);
        })
      };
    });

    it('calls to chrome history API with the options and callback', function() {
      PageVisit.search(options, callback);
      expect(chrome.history.search).toHaveBeenCalledWith(options, jasmine.any(Function));
    });

    it('calls the callback with the results', function() {
      PageVisit.search(options, callback);
      expect(callback).toHaveBeenCalled();
    });
  });
});
