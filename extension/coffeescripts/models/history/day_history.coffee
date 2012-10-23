class BH.Models.DayHistory extends BH.Models.Base
  isNew: ->
    false

  sync: (method, model, options) ->
    switch method
      when 'read'
        historyQuery = new BH.Lib.HistoryQuery(@chromeAPI)
        historyQuery.run @toChrome(), (history) ->
          workerOptions =
            visits: history
            interval: settings.get 'timeGrouping'
            domainGrouping: settings.get('domainGrouping')
          worker 'grouper', workerOptions, (visits) ->
            options.success(visits)
      when 'delete'
        @chromeAPI.history.deleteRange @toChrome(false), =>
          @set({history: new BH.Collections.Intervals()})

  toChrome: (reading = true) ->
    properties = startTime: @sod(), endTime: @eod()
    properties.text = '' if reading
    properties

  toTemplate: ->
    intervals: @get('intervals').map (interval) ->
      interval.toTemplate()

  sod: ->
    new Date(@get('date').sod()).getTime()

  eod: ->
    new Date(@get('date').eod()).getTime()

  isEmpty: ->
    @get('intervals').length == 0

  parse: (data) ->
    intervals = new BH.Collections.Intervals()

    for interval in data
      visits = new BH.Collections.Visits()
      for visit in interval.visits
        if _.isArray(visit)
          visits.add(new BH.Models.GroupedVisit(visit))
        else
          visits.add(new BH.Models.Visit(visit))

      intervals.add
        id: interval.id
        datetime: interval.datetime
        visits: visits

    intervals: intervals
