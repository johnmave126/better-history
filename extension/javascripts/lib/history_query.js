(function() {

  BH.Lib.HistoryQuery = (function() {

    function HistoryQuery(chromeAPI, sanitizer) {
      this.chromeAPI = chromeAPI;
      this.sanitizer = sanitizer;
    }

    HistoryQuery.prototype.run = function(options, callback) {
      var _this = this;
      this.options = options;
      if (this.options.text) {
        this.text = this.options.text;
        this.options.text = '';
      }
      if (this.options.searching != null) {
        _.extend(this.options, this.searchOptions);
      }
      return this.chromeAPI.history.search(options, function(results) {
        return _this.searchHandler(results, callback);
      });
    };

    HistoryQuery.prototype.searchHandler = function(results, callback) {
      if (this.text) {
        this.options.text = this.text;
      }
      return callback(this.sanitizer.clean(this.options, results));
    };

    HistoryQuery.prototype.searchOptions = {
      startTime: 0,
      maxResults: 0
    };

    return HistoryQuery;

  })();

}).call(this);
