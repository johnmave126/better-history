(function() {

  BH.Lib.SearchResultsSanitizer = (function() {

    function SearchResultsSanitizer(chromeAPI) {
      this.chromeAPI = chromeAPI;
    }

    SearchResultsSanitizer.prototype.clean = function(options, results) {
      var prunedResults,
        _this = this;
      this.options = options;
      if (this.options.text) {
        this.terms = options.text.split(' ');
      }
      prunedResults = [];
      _.each(results, function(result) {
        if (_this.options.searching != null) {
          if (prunedResults.length >= 100) {
            return true;
          } else {
            _this.setAdditionalProperties(result);
            if (_this.verifyTextMatch(result)) {
              _this.removeScriptTags(result);
              _this.wrapTextMatch(result);
              return prunedResults.push(result);
            }
          }
        } else {
          if (_this.verifyDateRange(result)) {
            _this.removeScriptTags(result);
            _this.setAdditionalProperties(result);
            if (_this.terms && _this.terms.length !== 0) {
              if (_this.verifyTextMatch(result)) {
                _this.wrapTextMatch(result);
              }
            }
            if (_this.terms && _this.terms.length !== 0) {
              if (_this.verifyTextMatch(result)) {
                return prunedResults.push(result);
              }
            } else {
              return prunedResults.push(result);
            }
          }
        }
      });
      prunedResults.sort(this.sortByTime);
      return prunedResults;
    };

    SearchResultsSanitizer.prototype.verifyTextMatch = function(result) {
      var hits, regExp;
      hits = [];
      regExp = null;
      _.each(this.terms, function(term) {
        regExp = new RegExp(term, "i");
        if (result.time.match(regExp) || result.url.match(regExp) || result.title.match(regExp)) {
          return hits.push(true);
        }
      });
      if ((this.terms != null) && hits.length === this.terms.length) {
        return true;
      } else {
        return false;
      }
    };

    SearchResultsSanitizer.prototype.verifyDateRange = function(result) {
      return result.lastVisitTime > this.options.startTime && result.lastVisitTime < this.options.endTime;
    };

    SearchResultsSanitizer.prototype.wrapMatchInProperty = function(regExp, property, match) {
      match = property.match(regExp);
      if (match) {
        return property.replace(regExp, '<span class="match">' + match + '</span>');
      } else {
        return property;
      }
    };

    SearchResultsSanitizer.prototype.wrapTextMatch = function(result) {
      var locationMatch, regExp, timeMatch, titleMatch,
        _this = this;
      regExp = titleMatch = locationMatch = timeMatch = null;
      return _.each(this.terms, function(term) {
        regExp = new RegExp(term, "i");
        result.title = _this.wrapMatchInProperty(regExp, result.title);
        result.location = _this.wrapMatchInProperty(regExp, result.location);
        return result.time = _this.wrapMatchInProperty(regExp, result.time);
      });
    };

    SearchResultsSanitizer.prototype.removeScriptTags = function(result) {
      var el;
      el = document.createElement('div');
      return _.each(['title', 'location'], function(property) {
        el.innerHTML = result[property];
        $('script', el).remove();
        return result[property] = $(el).text();
      });
    };

    SearchResultsSanitizer.prototype.setAdditionalProperties = function(result) {
      var date;
      result.location = result.url;
      date = new Date(result.lastVisitTime);
      return result.time = moment(date).format(this.chromeAPI.i18n.getMessage('extended_formal_date'));
    };

    SearchResultsSanitizer.prototype.sortByTime = function(a, b) {
      if (a.lastVisitTime > b.lastVisitTime) {
        return -1;
      }
      if (a.lastVisitTime < b.lastVisitTime) {
        return 1;
      }
      return 0;
    };

    return SearchResultsSanitizer;

  })();

}).call(this);
