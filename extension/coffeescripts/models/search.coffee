class BH.Models.Search extends BH.Models.Base
  initialize: ->
    @bind('change:query', @updateTitle, @)

  toTemplate: ->
    @toJSON()

  updateTitle: ->
    terms = @get('query').split(' ')
    joined = @chromeAPI.i18n.getMessage('searching_title') + ' '

    _.each terms, (term, i) =>
      joined += "\"#{term}\""
      if i != terms.length - 1
        joined += ' ' + @chromeAPI.i18n.getMessage('and') + ' '

    @set(title: joined)

  toChrome: ->
    text: @get('query')
    searching: true

  sync: (method, model, options) ->
    if method == 'read'
      sanitizer = new BH.Lib.SearchResultsSanitizer(@chromeAPI)
      historyQuery = new BH.Lib.HistoryQuery(@chromeAPI, sanitizer)
      historyQuery.run @toChrome(), (history) ->
        options.success(history)

  parse: (data) ->
    history: new BH.Collections.Visits(data)
