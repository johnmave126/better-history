importScripts('../frameworks/underscore-min.js')

class @DomainGrouper
  run: (visits) ->
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

  _compareVisits: (visit1, visit2) ->
    if (visit1? && visit2?)
      if visit1.domain() == visit2.domain()
        true
    else
      false


self.addEventListener 'message', (e) ->
  grouper = new DomainGrouper()
  postMessage(grouper.run(e.data.visits))
