class BH.Lib.HistoryQuery extends BH.Base
  @include BH.Modules.Worker
  @include BH.Modules.I18n

  constructor: ->
    @chromeAPI = chrome

  run: (@options, callback) ->
    searchOptions = @assembleSearchOptions(@options)

    @chromeAPI.history.search searchOptions, (results) =>
      results = @prepareResults(results)
      @sanitizeResults(results, callback)

  assembleSearchOptions: (originalOptions) ->
    options = originalOptions

    if options.searching?
      options.startTime = 0
      options.maxResults = 0
      delete options.searching
    else
      options.maxResults = 5000 unless options.maxResults?

    # Can't depend on Chrome's history search, unassign text in options
    if options.text
      @text = options.text
      options.text = ''

    options

  sanitizeResults: (results, callback) ->
    options = options: @options, results: results
    options.options.text = @text if @text
    @worker('sanitizer', options, callback)

  prepareResults: (results) ->
    for result in results
      result.date = new Date(result.lastVisitTime)

      # Translate dates and times here for the search sanitizer
      result.extendedDate = moment(result.date).format(@t('extended_formal_date'))
      result.time = moment(result.date).format(@t('local_time'))
    results
