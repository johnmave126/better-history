BH.Modules.historySupport =
  defaults:
    history: []

  isNew: ->
    false

  isEmpty: ->
    @get('history').length == 0
