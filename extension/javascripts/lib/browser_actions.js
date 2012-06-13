(function() {

  BH.Lib.BrowserActions = (function() {

    function BrowserActions(chromeAPI, urlBuilder) {
      this.chromeAPI = chromeAPI;
      this.urlBuilder = urlBuilder;
    }

    BrowserActions.prototype.listen = function() {
      return this.chromeAPI.browserAction.onClicked.addListener(this.openHistory);
    };

    BrowserActions.prototype.openHistory = function() {
      return this.chromeAPI.tabs.create({
        url: this.urlBuilder.build('base')
      });
    };

    return BrowserActions;

  })();

}).call(this);
