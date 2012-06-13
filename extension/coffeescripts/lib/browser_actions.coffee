class BH.Lib.BrowserActions
  constructor: (@chromeAPI, @urlBuilder) ->

  listen: ->
    @chromeAPI.browserAction.onClicked.addListener(@openHistory)

  openHistory: ->
    @chromeAPI.tabs.create
      url: @urlBuilder.build('base')
