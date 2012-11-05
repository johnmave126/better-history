class BH.Models.SearchHistory extends BH.Models.History
  sync: (method, model, options) ->
    if method == 'read'
      historyQuery = new BH.Lib.HistoryQuery(@chromeAPI)
      historyQuery.run @toChrome(), (history) ->
        options.success(history)

  toTemplate: ->
    @get('history').toTemplate grouped: false

  toChrome: ->
    text: @get('query')
    searching: true

  parse: (data) ->
    visits = new BH.Collections.Visits()

    for visit in data
      visits.add(new BH.Models.Visit(visit))

    history: visits
