BrowserActions = function() {
  return {
    listen: function() {
      chrome.browserAction.onClicked.addListener(this.openHistory);
    },

    openHistory: function() {
      chrome.tabs.create({
        url: BH.Lib.Url.base()
      });
    }
  };
};
