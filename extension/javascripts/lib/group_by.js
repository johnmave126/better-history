var GroupBy;
(function() {
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
    interval = settings.timeGrouping();
    minutes = Math.floor(minutes / interval) * interval;
    return (minutes === 0 ? '00' : minutes);
  }

  function standardTimeByInterval(date, interval) {
    return hours(date.getHours()) + ':' + minute(date.getMinutes()) + ' ' + period(date.getHours());
  }

  function compareVisits(visit1, visit2) {
    if(visit1.domain() === null || visit2.domain() === null) {
      return false;
    } else if(visit1.domain() == visit2.domain()) {
      return true;
    } else {
      return false;
    }
  }
  GroupBy = {
    time: function(visits) {
      var arrangedVisits = [];
      $.each(visits, function(i, visit) {
        var lastVisitTime = new Date(visit.lastVisitTime),
            time = standardTimeByInterval(lastVisitTime);

        var times = _.pluck(arrangedVisits, 'time'),
            index = times.indexOf(time);

        if(index === -1) {
          arrangedVisits.push({time: time, pageVisits:[]});
          index = arrangedVisits.length - 1;
        }

        arrangedVisits[index].pageVisits.push(visit);
      });
      return arrangedVisits;
    },
    domain: function(visits) {
      groupedVisits = [];
      $.each(visits.models, function(i, visit) {
        if (groupedVisits.length === 0) {
          groupedVisits.push(visit);
        } else {
          if (compareVisits(visit, previous)) {
            if (groupedVisits[groupedVisits.length - 1].length === undefined) {
              groupedVisits.remove(-1);
              groupedVisits.push(new GroupedVisits([previous, visit]));
            } else {
              groupedVisits[groupedVisits.length - 1].add(visit);
            }
          } else {
            groupedVisits.push(visit);
          }
        }
        previous = visit;
      });
      return groupedVisits;
    }
  };
})();
