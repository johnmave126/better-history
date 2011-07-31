function GroupBy() {
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

  function prepareKeys(formatted, dateKey, timeKey) {
    if(formatted[dateKey] == undefined) {
      formatted[dateKey] = [];
    }
    if(formatted[dateKey][timeKey] == undefined) {
      formatted[dateKey][timeKey] = [];
    }

    return formatted;
  }

  return {
    dateAndTime: function(results) {
      var formatted = {};

      $.each(results, function(index, result) {
        var date = new Date(result.lastVisitTime),
            dateKey = date.toLocaleDateString(),
            timeKey = standardTimeByInterval(date);

        formatted = prepareKeys(formatted, dateKey, timeKey);
        formatted[dateKey][timeKey].push(result);
      });
      return formatted;
    }
  };
}
