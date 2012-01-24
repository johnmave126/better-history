// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

//chk if an object is an array or not.
function isArray(obj) {
  if (obj.constructor.toString().indexOf('Array') == -1)
    return false;
  else
    return true;
}

function stringToBool(string) {
  return (string == 'true' ? true : false);
}

function boolToString(bool) {
  return (bool ? 'true' : 'false');
}

String.prototype.toCamel = function(){
  return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};


Helpers = {
  getDomain: function(url) {
    return url.match(/\w+:\/\/(.*?)\//);
  },

  pageTitle: function(title) {
    element = $('<div/>');
    document.title = $(element).html(title).text() + ' - Better History';
  },

  tabIndex: function(selector) {
    $(selector).each(function(i) {
      $(this).attr('tabindex', i+2);
    });
  },

  formatTime: function(date, format) {
    function convertTo12Hour(militaryHours) {
      if(militaryHours === 0) {
        return 12;
      } else {
        return (militaryHours > 12 ? militaryHours - 12 : militaryHours);
      }
    }

    function minute(minutes) {
      return (minutes === 0 ? '00' : minutes);
    }

    function period(hours) {
      var key = 'morning';
      if(hours > 11) {
        key = (hours < 18 ? 'afternoon' : 'evening');
      }
      return chrome.i18n.getMessage(key);
    }

    var hours = date.getHours();
    if (format === 12) hours = convertTo12Hour(hours);
    var time = hours + ':' + minute(date.getMinutes());
    if (format === 12) {
      return chrome.i18n.getMessage('12_hour_time_format', [time, period(date.getHours())]);
    }
    return time;
  },

  formatExtendedFormalDate: function(date) {
    return chrome.i18n.getMessage('extended_formal_date', [
      chrome.i18n.getMessage(DateRanger.numberToDay(date.getDay())),
      chrome.i18n.getMessage(DateRanger.numberToMonth(date.getMonth())),
      date.getDate(),
      date.getFullYear()
    ]);
  }
};
