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

  describe('#sync', function() {
    var callback;

    beforeEach(function() {
      chrome.history = {deleteUrl: jasmine.createSpy('deleteUrl')};
      callback = jasmine.createSpy('callback');
    });

    it('does not call the chrome api when the method is not delete', function() {
      pageVisit.sync('write', pageVisit, {});
      expect(chrome.history.deleteUrl).not.toHaveBeenCalled();
    });

    it('calls the chrome api with the url to delete when the method is delete', function() {
      pageVisit.sync('delete', pageVisit, {success: callback});
      expect(chrome.history.deleteUrl).toHaveBeenCalledWith({url: pageVisit.get('url')});
    });

    it('calls the success callback with the model', function() {
      pageVisit.sync('delete', pageVisit, {success: callback});
      expect(callback).toHaveBeenCalledWith(pageVisit);
    });
  });
});
