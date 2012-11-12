class BH.Lib.BrowserActions
  constructor: (@chromeAPI) ->

  urlBuilder: BH.Lib.UrlBuilder

  listen: ->
    @chromeAPI.browserAction.onClicked.addListener =>
      @openHistory()

  openHistory: ->
    @chromeAPI.tabs.create
      url: @urlBuilder.build()
