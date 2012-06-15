(function() {

  BH.Lib.HistoryQuery = (function() {

    function HistoryQuery(chromeAPI) {
      this.chromeAPI = chromeAPI;
    }

    HistoryQuery.prototype.run = function(options, callback) {
      var originalText,
        _this = this;
      this.options = options;
      originalText = false;
      if (this.options.text) {
        originalText = this.options.text;
        this.terms = this.options.text.split(' ');
        this.options.text = '';
      }
      if (this.options.searching != null) {
        this.options.startTime = 0;
        this.options.maxResults = 0;
      }
      return this.chromeAPI.history.search(this.options, function(results) {
        if (originalText) {
          _this.options.text = originalText;
        }
        return callback(_this.pruneResults(results));
      });
    };

    HistoryQuery.prototype.verifyTextMatch = function(result) {
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

    HistoryQuery.prototype.verifyDateRange = function(result) {
      return result.lastVisitTime > this.options.startTime && result.lastVisitTime < this.options.endTime;
    };

    HistoryQuery.prototype.wrapMatchInProperty = function(regExp, property, match) {
      match = property.match(regExp);
      if (match) {
        return property.replace(regExp, '<span class="match">' + match + '</span>');
      } else {
        return property;
      }
    };

    HistoryQuery.prototype.wrapTextMatch = function(result) {
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

    HistoryQuery.prototype.removeScriptTags = function(result) {
      var el;
      el = document.createElement('div');
      return _.each(['title', 'location'], function(property) {
        el.innerHTML = result[property];
        $('script', el).remove();
        return result[property] = $(el).text();
      });
    };

    HistoryQuery.prototype.setAdditionalProperties = function(result) {
      var date;
      result.location = result.url;
      date = new Date(result.lastVisitTime);
      return result.time = moment(date).format(this.chromeAPI.i18n.getMessage('extended_formal_date'));
    };

    HistoryQuery.prototype.sortByTime = function(a, b) {
      if (a.lastVisitTime > b.lastVisitTime) {
        return -1;
      }
      if (a.lastVisitTime < b.lastVisitTime) {
        return 1;
      }
      return 0;
    };

    HistoryQuery.prototype.pruneResults = function(results) {
      var prunedResults,
        _this = this;
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

    return HistoryQuery;

  })();

}).call(this);
