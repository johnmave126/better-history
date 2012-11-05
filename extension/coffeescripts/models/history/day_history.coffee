class BH.Models.DayHistory extends BH.Models.History
  initialize: ->
    super()

  sync: (method, model, options) ->
    switch method
      when 'read'
        @historyQuery.run @toChrome(), (history) =>
          @preparse(history, options.success)

      when 'delete'
        @chromeAPI.history.deleteRange @toChrome(false), =>
          @set history: @defaults.history

  toChrome: (reading = true) ->
    properties = startTime: @sod(), endTime: @eod()
    properties.text = '' if reading
    properties

  toTemplate: ->
    history: @get('history').map (interval) ->
      interval.toTemplate()

  sod: ->
    new Date(@get('date').sod()).getTime()

  eod: ->
    new Date(@get('date').eod()).getTime()

  preparse: (results, callback) ->
    # TODO: this settings dependency is awful
    config =
      visits: results
      interval: settings.get 'timeGrouping'
      #domainGrouping: settings.get('domainGrouping')

    worker 'timeGrouper', config, (history) ->
      callback(history)

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

    history: intervals
