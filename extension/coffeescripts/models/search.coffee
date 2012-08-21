class BH.Models.Search extends BH.Models.Base
  initialize: ->
    @bind('change:query', @updateTitle, @)

  toTemplate: ->
    @toJSON()

  updateTitle: ->
    @terms = @get('query').split(' ')
    joined = @chromeAPI.i18n.getMessage('searching_title') + ' '

    _.each @terms, (term, i) =>
      joined += "\"#{term}\""
      if i != @terms.length - 1
        joined += ' ' + @chromeAPI.i18n.getMessage('and') + ' '

    @set(title: joined)

  toChrome: ->
    text: @get('query')
    searching: true

  sync: (method, model, options) ->
    if method == 'read'
      historyQuery = new BH.Lib.HistoryQuery(@chromeAPI)
      historyQuery.run @toChrome(), (history) ->
        options.success(history)

  parse: (data) ->
    visits = new BH.Collections.Visits()

    _.each data, (visit) ->
      visits.add(new BH.Models.Visit(visit))

    history: visits
