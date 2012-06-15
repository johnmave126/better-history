(function() {

  describe("BrowserActions", function() {
    var browserActions, chromeAPI, urlBuilder;
    browserActions = chromeAPI = urlBuilder = null;
    beforeEach(function() {
      chromeAPI = loadChromeAPI();
      urlBuilder = new BH.Helpers.UrlBuilder();
      urlBuilder.build = jasmine.createSpy('build').andCallFake(function(key) {
        return "" + key + " url";
      });
      return browserActions = new BH.Lib.BrowserActions(chromeAPI, urlBuilder);
    });
    describe("#listen", function() {
      return it("listens for onClick on the browser action", function() {
        browserActions.listen();
        return expect(chromeAPI.browserAction.onClicked.addListener).toHaveBeenCalledWith(browserActions.openHistory);
      });
    });
    return describe("#openHistory", function() {
      return it("opens history in a new tab", function() {
        browserActions.openHistory();
        return expect(chromeAPI.tabs.create).toHaveBeenCalledWith({
          url: 'base url'
        });
      });
    });
  });

}).call(this);
