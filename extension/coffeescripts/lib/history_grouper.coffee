class BH.Lib.HistoryGrouper
  time: (visits, interval) ->
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
          pageVisits:[]
        index = arrangedVisits.length - 1
      arrangedVisits[index].pageVisits.push(visit)
    arrangedVisits

  domain: (visits) ->
    groupedVisits = []
    previous = null
    _.each visits.models, (visit) =>
      if groupedVisits.length == 0
        groupedVisits.push(visit)
        previous = visit
      else
        if @_compareVisits(visit, previous)
          if groupedVisits[groupedVisits.length - 1].length == undefined
            groupedVisits.pop()
            groupedVisits.push(new BH.Collections.GroupedVisits([previous, visit]))
          else
            groupedVisits[groupedVisits.length - 1].add(visit)
        else
          groupedVisits.push(visit)
      previous = visit
    groupedVisits

  _minute: (minutes, interval) ->
    minutes = Math.floor(minutes / interval) * interval
    if minutes == 0 then '00' else minutes

  _getTime: (date, interval) ->
    date.getHours() + ':' + @_minute(date.getMinutes(), interval)

  _compareVisits: (visit1, visit2) ->
    if (visit1? && visit2?)
      if visit1.domain() == visit2.domain()
        true
    else
      false
