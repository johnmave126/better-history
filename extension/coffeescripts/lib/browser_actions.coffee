class BH.Lib.BrowserActions extends BH.Base
  @include BH.Modules.chromeSupport
  @include BH.Modules.urlSupport

  listen: ->
    @chromeAPI.browserAction.onClicked.addListener =>
      @openHistory()

  openHistory: ->
    @chromeAPI.tabs.create
      url: @urlFor()
