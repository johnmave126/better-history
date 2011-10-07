var GroupBy;
var groupInterval = 15;
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
    minutes = Math.floor(minutes / groupInterval) * groupInterval;
    return (minutes === 0 ? '00' : minutes);
  }

  function standardTimeByInterval(date) {
    return hours(date.getHours()) + ':' + minute(date.getMinutes()) + ' ' + period(date.getHours());
  }

  GroupBy = {
    time: function(pageVisits) {
      var dateVisits = new DateVisits();
      $.each(pageVisits.models, function(index, pageVisit) {
        var lastVisitTime = new Date(pageVisit.get('lastVisitTime'));

        var date = lastVisitTime.toLocaleDateString().match(/([^,]*),(.*)/)[2],
            time = standardTimeByInterval(lastVisitTime);

        if(dateVisits.pluck('date').indexOf(date) === -1) {
          dateVisits.add([{date: date, timeVisits:new TimeVisits()}]);
        }

        var dateVisit = dateVisits.at(dateVisits.pluck('date').indexOf(date));
        var timeVisits = dateVisit.get('timeVisits');

        if(timeVisits.pluck('time').indexOf(time) === -1) {
          dateVisit.get('timeVisits').add([{date: date, time: time, pageVisits:new PageVisits()}]);
        }

        var timeVisit = timeVisits.at(timeVisits.pluck('time').indexOf(time));
        var pageVisits = timeVisit.get('pageVisits');
        pageVisits.add([pageVisit]);
      });
      return dateVisits.models[0].get('timeVisits');
    },

    domain: function(pageVisits) {
      groupedVisits = [];
      $.each(pageVisits.models, function(i, pageVisit) {
        if(groupedVisits.length === 0) {
          groupedVisits.push(pageVisit);
        } else {
          if(pageVisit.compare(previous)) {
            if(groupedVisits[groupedVisits.length - 1].length === undefined) {
              groupedVisits.remove(-1);
              groupedVisits.push(new GroupedVisits([previous, pageVisit]));
            } else {
              groupedVisits[groupedVisits.length - 1].add(pageVisit);
            }
          } else {
            groupedVisits.push(pageVisit);
          }
        }

        previous = pageVisit;
      });
      console.log(groupedVisits);
      return groupedVisits;
    }
  };
})();
