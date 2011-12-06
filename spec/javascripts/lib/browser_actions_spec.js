describe('BrowserActions', function() {
  var browserActions;

  beforeEach(function() {
    browserActions = new BrowserActions();
  });

  describe('#listen', function() {
    beforeEach(function() {
      chrome = {browserAction: {onClicked: {
        addListener: jasmine.createSpy('addListener')
      }}};
    });

    it('listens for onClick on the browser action', function() {
      browserActions.listen();
      expect(chrome.browserAction.onClicked.addListener).toHaveBeenCalledWith(browserActions.openHistory);
    });
  });

  describe('#openHistory', function() {
    beforeEach(function() {
      chrome = {tabs: {create: jasmine.createSpy('create')}};
    });

    it('opens history in a new tab', function() {
      browserActions.openHistory();
      expect(chrome.tabs.create).toHaveBeenCalledWith({
        url: Url.base()
      });
    });
  });
});
