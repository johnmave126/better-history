class BH.Lib.HistoryQuery extends BH.Base
  @include BH.Modules.Worker
  @include BH.Modules.I18n

  constructor: ->
    @chromeAPI = chrome

  run: (options, callback) ->
    searchOptions = @assembleSearchOptions(options)

    @chromeAPI.history.search searchOptions, (results) =>
      results = @prepareResults(results)
      @sanitizeResults(options, results, callback)

  assembleSearchOptions: (options) ->
    @halt 'No text property' unless options.text?

    if options.text != ''
      options.startTime = 0
      options.maxResults = 0
      # Can't depend on Chrome's history search, unassign text in options
      @text = options.text
      options.text = ''
    else
      options.maxResults = 5000 unless options.maxResults?

    options

  sanitizeResults: (options, results, callback) ->
    options.text = @text if @text
    @worker 'sanitizer',
      options: options
      results: results
    , callback

  prepareResults: (results) ->
    for result in results
      result.date = new Date(result.lastVisitTime)

      dateMoment = moment(result.date)
      # Translate dates and times here for the search sanitizer
      result.extendedDate = dateMoment.format(@t('extended_formal_date'))
      result.time = dateMoment.format(@t('local_time'))
    results
