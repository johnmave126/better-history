importScripts('../frameworks/underscore-min.js')

class @DayGrouper
  run: (visits) ->
    dayGroupedVisits =
      Monday: []
      Tuesday: []
      Wednesday: []
      Thursday: []
      Friday: []
      Saturday: []
      Sunday: []

    for visit in visits
      day = new Date(visit.lastVisitTime).getDay() - 1
      dayGroupedVisits[@indexToDay day].push visit
    dayGroupedVisits

  indexToDay: (index) ->
    switch index
      when 0 then 'Monday'
      when 1 then 'Tuesday'
      when 2 then 'Wednesday'
      when 3 then 'Thursday'
      when 4 then 'Friday'
      when 5 then 'Saturday'
      when 6 then 'Sunday'

self.addEventListener 'message', (e) ->
  dayGrouper = new DayGrouper()
  postMessage dayGrouper.run(e.data.visits)
