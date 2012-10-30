class BH.Models.History extends BH.Models.Base
  initialize: ->
    @historyQuery = new BH.Lib.HistoryQuery(@chromeAPI)

