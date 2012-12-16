describe "BH.Lib.BrowserActions", ->
  beforeEach ->
    @browserActions = new BH.Lib.BrowserActions()
    @chromeAPI = @browserActions.chromeAPI

  describe "#listen", ->
    it "listens for onClick on the browser action", ->
      @browserActions.listen()
      expect(@chromeAPI.browserAction.onClicked.addListener).toHaveBeenCalledWith jasmine.any(Function)

  describe "#openHistory", ->
    it "opens history in a new tab", ->
      @browserActions.openHistory()
      expect(@chromeAPI.tabs.create).toHaveBeenCalledWith url: 'chrome://history/'
