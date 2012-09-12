importScripts('../frameworks/underscore-min.js')

class @Grouper
  run: (visits, options) ->
    intervals = @groupByTime(visits, options.interval)
    if options.domainGrouping
      _(intervals).each (interval) =>
        interval.visits = @groupByDomain(interval.visits)
    intervals

  groupByDomain: (visits) ->
    groupedVisits = []
    previous = null
    _.each visits, (visit) =>
      if groupedVisits.length == 0
        groupedVisits.push(visit)
        previous = visit
      else
        if @_compareVisits(visit, previous)
          if groupedVisits[groupedVisits.length - 1].length == undefined
            groupedVisits.pop()
            groupedVisits.push([previous, visit])
          else
            groupedVisits[groupedVisits.length - 1].push(visit)
        else
          groupedVisits.push(visit)
      previous = visit
    groupedVisits

  _compareVisits: (visit1, visit2) ->
    if (visit1? && visit2?)
      if @_domain(visit1) == @_domain(visit2)
        true
    else
      false

  _domain: (visit) ->
    match = visit.url.match(/\/\/(.*?)\//)
    if match == null then null else match[0]

  groupByTime: (visits, interval) ->
    arrangedVisits = []
    _.each visits, (visit) =>
      lastVisitTime = new Date(visit.lastVisitTime)
      id = @_getTime(lastVisitTime, interval)

      ids = _.pluck(arrangedVisits, 'id')
      index = ids.indexOf(id)

      if index == -1
        arrangedVisits.push
          datetime: new Date(lastVisitTime.toLocaleDateString() + ' ' + id)
          id: id
          visits:[]
        index = arrangedVisits.length - 1
      arrangedVisits[index].visits.push(visit)
    arrangedVisits

  _minute: (minutes, interval) ->
    minutes = Math.ceil(minutes / interval) * interval
    if minutes == 60
      return '00'
    if minutes == 0
      return '15'
    minutes

  _getTime: (date, interval) ->
    minutes = @_minute date.getMinutes(), interval
    hour = date.getHours()
    hour = hour + 1 if minutes == '00'
    "#{hour}:#{minutes}"

self.addEventListener 'message', (e) ->
  grouper = new Grouper()
  postMessage grouper.run(e.data.visits,
    interval: e.data.interval
    domainGrouping: e.data.domainGrouping
  )
