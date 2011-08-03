// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

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

  function prepareKeys(formatted, dateKey, timeKey) {
    if(formatted[dateKey] == undefined) {
      formatted[dateKey] = [];
    }
    if(formatted[dateKey][timeKey] == undefined) {
      formatted[dateKey][timeKey] = [];
    }

    return formatted;
  }

  function compareHistoryItems(current, past) {
    if(current.domain() === null || past.domain() === null) {
      return false;
    } else if(current.domain() == past.domain()) {
      return true;
    } else {
      return false;
    }
  }

  groupResults = function(historyItems) {
    var formatted = {};
    console.log(historyItems);
    $.each(historyItems, function(index, historyItem) {
      var date = new Date(historyItem.lastVisitTime),
          dateKey = date.toLocaleDateString(),
          timeKey = standardTimeByInterval(date);

        formatted = prepareKeys(formatted, dateKey, timeKey);

        if(formatted[dateKey][timeKey].length == 0) {
          formatted[dateKey][timeKey].push(historyItem);
        } else {
          if(compareHistoryItems(historyItem, previous)) {
            var array = formatted[dateKey][timeKey];
            if(formatted[dateKey][timeKey][array.length - 1].length != null) {
              formatted[dateKey][timeKey][array.length - 1].push(historyItem);
            } else {
              formatted[dateKey][timeKey].remove(-1);
              formatted[dateKey][timeKey].push([previous, historyItem]);
            }

          } else {
            formatted[dateKey][timeKey].push(historyItem);
          }
        }

        previous = historyItem;
    });
    console.log(formatted);
    return formatted;
  }
})();
