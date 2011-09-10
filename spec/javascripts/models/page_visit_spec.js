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
      presentedProperties.time = new Date(pageVisit.get('lastVisitTime')).toLocaleDateString();
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
    var options, callback, results;

    beforeEach(function() {
      options = {
        test: 'option'
      };
      results = [{title: 'title', url: 'google.com'}];
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

    it('matches results by checking if the search term exists in the title and url', function() {
      results = [
        {title: 'hit this', url: 'google.com'},
        {title: 'lame', url: 'google.com/hit'},
        {title: 'no match', url: 'google.com'}
      ];

      var expectedPageVisits = new PageVisits([results[0], results[1]]);

      PageVisit.search({text:'hit'}, function(results) {
        expect(results.toJSON()).toEqual(expectedPageVisits.toJSON());
      });
    });

    it('matches results by checking if the date falls between the searched ranges', function() {
      results = [
        {title: 'google', url: 'google.com', lastVisitTime: new Date("October 12, 2010")},
        {title: 'hit', url: 'google.com/hit', lastVisitTime: new Date("December 5, 2010")},
        {title: 'sample', url: 'google.com/sample', lastVisitTime: new Date("October 13, 2010")}
      ];

      var expectedPageVisits = new PageVisits([results[0], results[2]]);
      PageVisit.search({
        startTime: new Date("October 1, 2010"),
        endTime: new Date("October 14, 2010")
      }, function(results) {
        expect(results.toJSON()).toEqual(expectedPageVisits.toJSON());
      });
    });
  });
});
