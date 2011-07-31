function ChromeHistory() {
  var groupBy = new GroupBy();

  function assembleOptions(options) {
    var defaults = {
      text:'',
      maxResults: 10000
    };
    return $.extend(defaults, options);
  }

  return {
    search: function(options, callback) {
      chrome.history.search(assembleOptions(options), function (results) {
        callback(groupBy.dateAndTime(results));
      });
    }
  };
}
