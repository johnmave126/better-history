chrome = {};

describe('Visit', function() {
  var properties, visit;

  beforeEach(function() {
    properties = {
      title: 'test',
      lastVisitTime: new Date(),
      url: 'http://google.com/page/'
    };
    visit = new Visit(properties);
  });

  describe('#initialize', function() {
    it('assigns a default title if the title is empty', function() {
      var aVisit = new Visit({
        title: '',
        lastVisitTime: new Date(),
        url: 'address'
      });
      expect(aVisit.get('title')).toEqual(aVisit.defaults.title);
    });
  });

  describe('#domain', function() {
    it('returns the domain when a domain exists in the url', function() {
      expect(visit.domain()).toEqual('http://google.com/');
    });

    it('returns null when the url does not have a domain', function() {
      visit.set({url: 'http://localhost/~roykolak'});
      expect(visit.domain()).toEqual('http://localhost/');
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
      Visit.search(options, callback);
      expect(chrome.history.search).toHaveBeenCalledWith(options, jasmine.any(Function));
    });

    it('calls the callback with the results', function() {
      Visit.search(options, callback);
      expect(callback).toHaveBeenCalled();
    });
  });
});
