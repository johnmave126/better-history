BH.Modules.historySupport =
  defaults:
    history: []

  isNew: ->
    false

  historyQuery: new BH.Lib.HistoryQuery(@chromeAPI)

  isEmpty: ->
    @get('history').length == 0
