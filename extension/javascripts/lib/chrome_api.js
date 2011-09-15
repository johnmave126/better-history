var chromeAPI = {
  history: {
    search: function(options, callback) {
      if(options.text) {
        var terms = options.text.split(' ');
      }

      function verifyTextMatch(result) {
        var hits = [], regExp;

        $.each(terms, function(i) {
          regExp = new RegExp(terms[i], "i");
          if(result.time.match(regExp) || result.url.match(regExp) || result.title.match(regExp)) {
            hits.push(true);
          }
        });

        return (hits.length === terms.length ? true : false);
      }

      function verifyDateRange(result) {
        return result.lastVisitTime > options.startTime && result.lastVisitTime < options.endTime;
      }

      function isSearchQuery() {
        return !(options.startTime && options.endTime);
      }

      function wrapMatchInProperty(regExp, property, match) {
        match = property.match(regExp);
        return (match ? property.replace(regExp, '<span class="match">' + match + '</span>') : property);
      }

      function wrapTextMatch(result) {
        var regExp, titleMatch, locationMatch, timeMatch;

        $.each(terms, function(i) {
          regExp = new RegExp(terms[i], "i");
          result.title = wrapMatchInProperty(regExp, result.title);
          result.location = wrapMatchInProperty(regExp, result.location);
          result.time = wrapMatchInProperty(regExp, result.time);
        });
      }

      function setAdditionalProperties(result) {
        result.location = result.url;
        result.time = new Date(result.lastVisitTime).toLocaleDateString();
      }

      var prunedResults = [];
      chrome.history.search(options, function(results) {
        $.each(results, function(i, result) {
          if (isSearchQuery()){
            setAdditionalProperties(result);
            if(verifyTextMatch(result)) {
              wrapTextMatch(result);
              prunedResults.push(result);
            }
          } else {
            if(verifyDateRange(result)) {
              setAdditionalProperties(result);
              prunedResults.push(result);
            }
          }
        });

        callback(prunedResults.sort(function(a, b) {
          if (a.lastVisitTime > b.lastVisitTime) { return -1; }
          if (a.lastVisitTime < b.lastVisitTime) { return 1; }
          return 0;
        }));
      });
    }
  }
};
