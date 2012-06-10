Helpers = {
  getDomain: function(url) {
    return url.match(/\w+:\/\/(.*?)\//);
  },

  pageTitle: function(title) {
    element = $('<div/>');
    document.title = $(element).html(title).text() + ' - Better History';
  },

  tabIndex: function(selector) {
    $('button').attr('tabindex', '-1');
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
      return chrome.i18n.getMessage('twelve_hour_time_format', [time, period(date.getHours())]);
    }
    return time;
  },
};
