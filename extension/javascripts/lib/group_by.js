var groupResults;
(function() {
  var interval = 15;

  function hours(militaryHours) {
    if(militaryHours === 0) {
      return 12;
    } else {
      return (militaryHours > 12 ? militaryHours - 12 : militaryHours);
    }
  }

  function period(hours) {
    return (hours < 12 ? 'AM' : 'PM');
  }

  function minute(minutes) {
    minutes = Math.floor(minutes / interval) * interval;
    return (minutes === 0 ? '00' : minutes);
  }

  function standardTimeByInterval(date) {
    return hours(date.getHours()) + ':' + minute(date.getMinutes()) + ' ' + period(date.getHours());
  }

  groupResults = function(visits) {
    var dateVisits = new DateVisits();
    $.each(visits, function(index, visit) {
      var lastVisitTime = new Date(visit.get('lastVisitTime'));

      var date = lastVisitTime.toLocaleDateString(),
          time = standardTimeByInterval(lastVisitTime);

      if(dateVisits.pluck('date').indexOf(date) === -1) {
        dateVisits.add([{date: date, timeVisits:new TimeVisits()}]);
      }

      var dateVisit = dateVisits.at(dateVisits.pluck('date').indexOf(date));
      var timeVisits = dateVisit.get('timeVisits');

      if(timeVisits.pluck('time').indexOf(time) === -1) {
        dateVisit.get('timeVisits').add([{time: time, visits:[]}]);
      }

      var timeVisit = timeVisits.at(timeVisits.pluck('time').indexOf(time));
      var visits = timeVisit.get('visits');

      if(visits.length === 0) {
        visits.push(visit);
      } else {
        if(visit.compare(previous)) {
          if(visits[visits.length - 1].length === undefined) {
            visits.remove(-1);
            visits.push(new GroupedVisits([previous, visit]));
          } else {
            visits[visits.length - 1].add(visit);
          }
        } else {
          visits.push(visit);
        }
      }

      previous = visit;
    });
    return dateVisits;
  }
})();
