class BH.Lib.HistoryQuery
  constructor: (@chromeAPI, @sanitizer) ->

  run: (@options, callback) ->
    if @options.text
      @text = @options.text
      @options.text = ''

    _.extend(@options, @searchOptions) if @options.searching?

    @chromeAPI.history.search options, (results) =>
      @searchHandler(results, callback)

  searchHandler: (results, callback) ->
    @options.text = @text if @text
    callback(@sanitizer.clean(@options, results))

  searchOptions:
    startTime: 0
    maxResults: 0
