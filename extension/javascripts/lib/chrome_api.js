var chromeAPI = {
  history: {
    search: function(options, callback) {
      var regExp = new RegExp(options.text, "i");

      var verifyTextMatch = function(result) {
        if(new Date(result.lastVisitTime).toLocaleDateString().match(regExp) ||
           result.url.match(regExp) ||
           result.title.match(regExp)) {
          return true;
        } else {
          return false;
        }
      };

      var verifyDateRange = function(result) {
        return result.lastVisitTime > options.startTime && result.lastVisitTime < options.endTime;
      };

      var isSearchQuery = function() {
        return !(options.startTime && options.endTime);
      };

      function compareLastVisitTime(a,b) {
        if (a.lastVisitTime > b.lastVisitTime) {
          return -1;
        }
        if (a.lastVisitTime < b.lastVisitTime) {
          return 1;
        }
        return 0;
      }

      var prunedResults = [];
      chrome.history.search(options, function(results) {
        $.each(results, function(i, result) {
          if (isSearchQuery()){
            if(verifyTextMatch(result)) {
              prunedResults.push(result);
            }
          } else {
            if(verifyDateRange(result)) {
              prunedResults.push(result);
            }
          }
        });
        callback(prunedResults.sort(compareLastVisitTime));
      });
    }
  }
};
