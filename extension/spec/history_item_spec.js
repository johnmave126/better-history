chrome = {};

describe('HistoryItem', function() {
  var visit, historyItem;

  beforeEach(function() {
    visit = {title: 'test', lastVisitTime: new Date(), url: 'http://google.com/page'};
    historyItem = new HistoryItem(visit);
  });

  describe('#initialize', function() {
    it('stores the title, lastVisitTime, and url', function() {
      expect(historyItem.title).toEqual(visit.title);
      expect(historyItem.lastVisitTime).toEqual(visit.lastVisitTime);
      expect(historyItem.url).toEqual(visit.url);
    });

    it('assigns a default title if the title is empty', function() {
      var aHistoryItem = new HistoryItem({title: '', lastVisitTime: new Date(), url: 'address'});
      expect(aHistoryItem.title).toEqual(aHistoryItem.defaultTitle);
    });
  });

  describe('#domain', function() {
    it('returns the domain when a domain exists in the url', function() {
      expect(historyItem.domain()).toEqual('http://google.com/');
    });

    it('returns null when the url does not have a domain', function() {
      historyItem.url = 'localhost/~roykolak';
      expect(historyItem.domain()).toEqual('localhost/');
    });
  });

  describe('.search', function() {
    var options, callback, results;

    beforeEach(function() {
      options = {test: 'option'};
      results = 'parsed results';
      callback = jasmine.createSpy('callback');
      chrome.history = {
        search: jasmine.createSpy('search').andCallFake(function(options, callback) {
          callback(results);
        })
      };
    });

    it('calls to chrome history API with the options and callback', function() {
      HistoryItem.search(options, callback);
      expect(chrome.history.search).toHaveBeenCalledWith(options, jasmine.any(Function));
    });

    it('calls the callback with the results', function() {
      HistoryItem.search(options, callback);
      expect(callback).toHaveBeenCalled();
    });
  });
});
