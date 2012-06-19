class BH.Models.Day extends Backbone.Model
  format:
    title: chrome.i18n.getMessage('day_date')
    formalDate: chrome.i18n.getMessage('formal_date')
    id: 'D'

  initialize: (properties, @options) ->
    id = @_dateFormat('id')
    this.set({
      title: @_dateFormat('title')
      inFuture: moment() < @get('date')
      formalDate: @_dateFormat('formalDate')
      id: id
      url: new BH.Helpers.UrlBuilder().build('day', [@get('weekId'), id])
    })

  toTemplate: ->
    @toJSON()

  toChrome: ->
    {text: @get('filter') || '', startTime: @_getSOD(), endTime: @_getEOD()}

  sync: (method, model, options) ->
    if method == 'read'
      sanitizer = new BH.Lib.SearchResultsSanitizer(chrome)
      historyQuery = new BH.Lib.HistoryQuery(chrome, sanitizer)
      historyQuery.run @toChrome(), (history) ->
        grouper = new BH.Lib.HistoryGrouper()
        options.success(grouper.time(history, settings.timeGrouping()))

  clear: ->
    chrome.history.deleteRange
      startTime: @_getSOD()
      endTime: @_getEOD()
    , =>
      @set({history: new BH.Collections.Intervals()})

  parse: (data) ->
    history = new BH.Collections.Intervals()
    count = 0

    $.each data, ->
      history.add
        id: @id
        datetime: @datetime
        pageVisits: new BH.Collections.Visits(@pageVisits)
      count += @pageVisits.length

    history: history
    count: count

  _getSOD: ->
    new Date(@get('date').sod()).getTime()

  _getEOD: ->
    new Date(@get('date').eod()).getTime()

  _dateFormat: (type) ->
    @get('date').format(@format[type])
