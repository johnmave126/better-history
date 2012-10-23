class BH.Models.SearchHistory extends BH.Models.Base
  defaults: ->
    history: {}

  isNew: ->
    false

  sync: (method, model, options) ->
    if method == 'read'
      historyQuery = new BH.Lib.HistoryQuery(@chromeAPI)
      historyQuery.run @toChrome(), (history) ->
        options.success(history)

  toChrome: ->
    text: @get('query')
    searching: true

  isEmpty: ->
    @get('history').length == 0

  parse: (data) ->
    visits = new BH.Collections.Visits()

    for visit in data
      visits.add(new BH.Models.Visit(visit))

    history: visits
