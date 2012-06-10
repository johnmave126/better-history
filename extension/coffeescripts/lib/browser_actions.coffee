class BH.Lib.BrowserActions
  listen: ->
    chrome.browserAction.onClicked.addListener(@openHistory)

  openHistory: ->
    chrome.tabs.create
      url: BH.Lib.Url.base()
