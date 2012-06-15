class BH.Lib.HistoryQuery
  constructor: (@chromeAPI) ->

  run: (@options, callback) ->
    originalText = false
    if @options.text
      originalText = @options.text
      @terms = @options.text.split(' ')
      @options.text = ''

    if @options.searching?
      @options.startTime = 0
      @options.maxResults = 0

    @chromeAPI.history.search @options, (results) =>
      @options.text = originalText if originalText
      callback(@pruneResults(results))

  verifyTextMatch: (result) ->
    hits = []
    regExp = null

    _.each @terms, (term) ->
      regExp = new RegExp(term, "i")
      if result.time.match(regExp) || result.url.match(regExp) || result.title.match(regExp)
        hits.push(true)

    if @terms? && hits.length == @terms.length then true else false

  verifyDateRange: (result) ->
    result.lastVisitTime > @options.startTime && result.lastVisitTime < @options.endTime

  wrapMatchInProperty: (regExp, property, match) ->
    match = property.match(regExp)
    if match then property.replace(regExp, '<span class="match">' + match + '</span>') else property

  wrapTextMatch: (result) ->
    regExp = titleMatch = locationMatch = timeMatch = null

    _.each @terms, (term) =>
      regExp = new RegExp(term, "i")
      result.title = @wrapMatchInProperty(regExp, result.title)
      result.location = @wrapMatchInProperty(regExp, result.location)
      result.time = @wrapMatchInProperty(regExp, result.time)

  removeScriptTags: (result) ->
    el = document.createElement('div')
    _.each ['title', 'location'], (property) ->
      el.innerHTML = result[property]
      $('script', el).remove()
      result[property] = $(el).text()

  setAdditionalProperties: (result) ->
    result.location = result.url
    date = new Date(result.lastVisitTime)
    result.time = moment(date).format(@chromeAPI.i18n.getMessage('extended_formal_date'))

  sortByTime: (a, b) ->
    return -1 if a.lastVisitTime > b.lastVisitTime
    return 1 if a.lastVisitTime < b.lastVisitTime
    0

  pruneResults: (results) ->
    prunedResults = []
    _.each results, (result) =>
      if @options.searching?
        if prunedResults.length >= 100
          true
        else
          @setAdditionalProperties(result)
          if @verifyTextMatch(result)
            @removeScriptTags(result)
            @wrapTextMatch(result)
            prunedResults.push(result)
      else
        if @verifyDateRange(result)
          @removeScriptTags(result)
          @setAdditionalProperties(result)
          if @terms && @terms.length != 0
            if @verifyTextMatch(result)
              @wrapTextMatch(result)
          if @terms && @terms.length != 0
            if @verifyTextMatch(result)
              prunedResults.push(result)
          else
            prunedResults.push(result)

    prunedResults.sort(@sortByTime)
    return prunedResults
