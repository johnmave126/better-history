class BH.Models.WeekHistory extends BH.Models.Base
  defaults:
    history: []

  isNew: ->
    false

  sync: (method, model, options) ->
    switch method
      when 'read'
        historyQuery = new BH.Lib.HistoryQuery @chromeAPI
        historyQuery.run @toChrome(), (history) ->
          worker 'dayGrouper', visits: history, (visits) ->
            options.success visits
      when 'delete'
        @chromeAPI.history.deleteRange @toChrome(false), =>
          @set history: {}

  toChrome: (reading = true)->
    properties = startTime: @sod(), endTime: @eod()
    properties.text = '' if reading
    properties

  toTemplate: ->
    total: @totalVisits()
    days:
      for day, visits of @get('history')
        count: visits.length
        day: day
        percentage: "#{@dayVisitPercentage day}%"

  sod: ->
    new Date(@get('startDate').sod()).getTime()

  eod: ->
    new Date(@get('endDate').eod()).getTime()

  dayVisits: ->
    for day, visits of @get('history')
      visits.length

  totalVisits: ->
    @dayVisits().reduce (sum, num) ->
      sum + num

  dayVisitPercentage: (day) ->
    largest = Math.max.apply(Math, @dayVisits()) || 0
    return 0 if largest == 0
    @get('history')[day].length / largest * 100

  parse: (data) ->
    history: data
