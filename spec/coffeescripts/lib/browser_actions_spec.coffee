describe "BH.Lib.BrowserActions", ->
  browserActions = chromeAPI = urlBuilder = null

  beforeEach ->
    chromeAPI = loadChromeAPI()
    urlBuilder = new BH.Helpers.UrlBuilder()
    urlBuilder.build = jasmine.createSpy('build').andCallFake (key) ->
        "#{key} url"

    browserActions = new BH.Lib.BrowserActions(chromeAPI, urlBuilder)

  describe "#listen", ->
    it "listens for onClick on the browser action", ->
      browserActions.listen()
      expect(chromeAPI.browserAction.onClicked.addListener).toHaveBeenCalledWith browserActions.openHistory

  describe "#openHistory", ->
    it "opens history in a new tab", ->
      browserActions.openHistory()
      expect(chromeAPI.tabs.create).toHaveBeenCalledWith url: 'base url'
