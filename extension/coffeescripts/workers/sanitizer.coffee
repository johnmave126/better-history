importScripts('../frameworks/underscore-min.js')

class @VisitsSanitizer
  clean: (@options, results) ->
    if @options.text
      @terms = options.text.split(' ')

    prunedResults = []
    _.each results, (result) =>
      if @options.searching?
        if prunedResults.length >= 100
          true
        else
          @setAdditionalProperties(result)
          if @verifyTextMatch(result)
            @removeScriptTags(result)
            prunedResults.push(result)
      else
        if @verifyDateRange(result)
          @setAdditionalProperties(result)
          @removeScriptTags(result)
          if @terms && @terms.length != 0
            if @verifyTextMatch(result)
              prunedResults.push(result)
          else
            prunedResults.push(result)

    prunedResults.sort(@sortByTime)
    return prunedResults

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

  removeScriptTags: (result) ->
    regex = /<(.|\n)*?>/ig
    _.each ['title', 'url', 'location'], (property) ->
      result[property] = result[property].replace(regex, "")

  setAdditionalProperties: (result) ->
    result.location = result.url

  sortByTime: (a, b) ->
    return -1 if a.lastVisitTime > b.lastVisitTime
    return 1 if a.lastVisitTime < b.lastVisitTime
    0

self.addEventListener 'message', (e) ->
  sanitizer = new VisitsSanitizer()
  postMessage(sanitizer.clean(e.data.options, e.data.results))
