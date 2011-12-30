var chromeAPI = {
  history: {
    search: function(options, callback) {
      var originalText = false;
      if(options.text) {
        originalText = options.text;
        var terms = options.text.split(' ');
        options.text = '';
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
        return (terms ? terms.length !== 0 : false);
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

      function removeScriptTags(result) {
        var el = document.createElement('div');
        $.each(['title', 'location'], function(i, property) {
          el.innerHTML = result[property];
          $('script', el).remove();
          result[property] = $(el).text();
        });
      }

      function setAdditionalProperties(result) {
        result.location = result.url;
        result.time = new Date(result.lastVisitTime).toLocaleDateString();
      }

      function sortByTime(a, b) {
        if (a.lastVisitTime > b.lastVisitTime) { return -1; }
        if (a.lastVisitTime < b.lastVisitTime) { return 1; }
        return 0;
      }

      function pruneResults(results) {
        var prunedResults = [];

        $.each(results, function(i, result) {
          if (isSearchQuery()){
            if(prunedResults.length >= 100) {
              return true;
            } else {
              setAdditionalProperties(result);
              if(verifyTextMatch(result)) {
                removeScriptTags(result);
                wrapTextMatch(result);
                prunedResults.push(result);
              }
            }
          } else {
            if(verifyDateRange(result)) {
              removeScriptTags(result);
              setAdditionalProperties(result);
              prunedResults.push(result);
            }
          }
        });

        prunedResults.sort(sortByTime);

        return prunedResults;
      }

      chrome.history.search(options, function(results) {
        if(originalText) options.text = originalText;
        callback(pruneResults(results));
      });
    }
  }
};
