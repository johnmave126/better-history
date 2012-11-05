class BH.Models.History extends BH.Models.Base
  defaults:
    history: []

  isNew: ->
    false

  initialize: ->
    @historyQuery = new BH.Lib.HistoryQuery(@chromeAPI)

  isEmpty: ->
    @get('history').length == 0
