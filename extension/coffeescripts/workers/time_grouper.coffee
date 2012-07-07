importScripts('../frameworks/underscore-min.js')

class @TimeGrouper
  run: (visits, interval) ->
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
    minutes = Math.floor(minutes / interval) * interval
    if minutes == 0 then '00' else minutes

  _getTime: (date, interval) ->
    date.getHours() + ':' + @_minute(date.getMinutes(), interval)


self.addEventListener 'message', (e) ->
  grouper = new TimeGrouper()
  postMessage(grouper.run(e.data.visits, e.data.interval))
