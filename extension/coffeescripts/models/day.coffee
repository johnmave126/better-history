class BH.Models.Day extends BH.Models.Base
  initialize: (properties, @options) ->
    id = @_dateFormat('id')
    this.set({
      title: @_dateFormat('title')
      inFuture: moment() < @get('date')
      formalDate: @_dateFormat('formalDate')
      id: id
      url: new BH.Helpers.UrlBuilder().build('day', [@get('weekId'), id])
      weekUrl: new BH.Helpers.UrlBuilder().build('week', [@get('weekId')])
    })

  toTemplate: ->
    @toJSON()

  toChrome: ->
    {text: @get('filter') || '', startTime: @_getSOD(), endTime: @_getEOD()}

  sync: (method, model, options) ->
    if method == 'read'
      historyQuery = new BH.Lib.HistoryQuery(@chromeAPI)
      historyQuery.run @toChrome(), (history) ->
        workerOptions =
          visits: history
          interval: settings.timeGrouping()
        worker 'grouper', workerOptions, (visits) ->
          options.success(visits)

  clear: ->
    @chromeAPI.history.deleteRange
      startTime: @_getSOD()
      endTime: @_getEOD()
    , =>
      @set({history: new BH.Collections.Intervals()})

  parse: (data) ->
    intervals = new BH.Collections.Intervals()
    count = 0

    _.each data, (interval) ->
      visits = new BH.Collections.Visits()
      _.each interval.visits, (visit) ->
        if _.isArray(visit)
          visits.add(new BH.Models.GroupedVisit(visit))
          count += visit.length
        else
          visits.add(new BH.Models.Visit(visit))
          count += 1

      intervals.add
        id: interval.id
        datetime: interval.datetime
        visits: visits

    history: intervals
    count: count

  _getSOD: ->
    new Date(@get('date').sod()).getTime()

  _getEOD: ->
    new Date(@get('date').eod()).getTime()

  _dateFormat: (type) ->
    @get('date').format(@_getFormats()[type])

  _getFormats: ->
    title: @chromeAPI.i18n.getMessage('day_date')
    formalDate: @chromeAPI.i18n.getMessage('formal_date')
    id: 'D'

