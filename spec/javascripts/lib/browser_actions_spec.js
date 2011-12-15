describe('BrowserActions', function() {
  var browserActions;

  beforeEach(function() {
    loadChromeAPI();
    browserActions = new BrowserActions();
  });

  describe('#listen', function() {
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
