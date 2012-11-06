class @DayGrouper
  constructor: ->
    @weekDays =
      Sunday: []
      Monday: []
      Tuesday: []
      Wednesday: []
      Thursday: []
      Friday: []
      Saturday: []

  run: (visits) ->
    for visit in visits
      day = new Date(visit.lastVisitTime).getDay()
      @weekDays[@indexToDay(day)].push visit
    @weekDays

  indexToDay: (index) ->
    days = for day of @weekDays
      days[index]

self.addEventListener 'message', (e) ->
  dayGrouper = new DayGrouper()
  postMessage dayGrouper.run(e.data.visits)
