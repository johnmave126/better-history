class BH.Lib.HistoryQuery
  constructor: (@chromeAPI) ->

  run: (@options, callback) ->
    if @options.text
      @text = @options.text
      @options.text = ''

    options = {}
    _.extend(options, @options)
    _.extend(options, @searchOptions) if @options.searching?
    delete options.searching

    @chromeAPI.history.search options, (results) =>
      @searchHandler(results, callback)

  searchHandler: (results, callback) ->
    @options.text = @text if @text
    results = @_prepareResults(results)
    @_sanitizeResults(results, callback)

  _sanitizeResults: (results, callback) ->
    options =
      options: @options
      results: results
    worker('sanitizer', options, callback)

  _prepareResults: (results) ->
    extendedFormalDate = @chromeAPI.i18n.getMessage('extended_formal_date')
    _(results).each (result) =>
      result.date = new Date(result.lastVisitTime)
      result.time = moment(result.date).format(extendedFormalDate)
    results

  searchOptions:
    startTime: 0
    maxResults: 0
