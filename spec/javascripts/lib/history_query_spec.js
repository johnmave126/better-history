(function() {

  describe("BH.Lib.HistoryQuery", function() {
    var callback, chromeAPI, historyQuery, options, sanitizer;
    options = callback = chromeAPI = sanitizer = historyQuery = null;
    beforeEach(function() {
      chromeAPI = loadChromeAPI();
      callback = jasmine.createSpy("callback");
      sanitizer = {
        clean: jasmine.createSpy('clean').andReturn('cleaned results')
      };
      return historyQuery = new BH.Lib.HistoryQuery(chromeAPI, sanitizer);
    });
    describe("#run", function() {
      beforeEach(function() {
        return options = {
          text: 'search term'
        };
      });
      it("calls to chrome history API with the options and callback", function() {
        historyQuery.run(options, callback);
        return expect(chromeAPI.history.search).toHaveBeenCalledWith(options, jasmine.any(Function));
      });
      describe("when searching is not set on the options", function() {
        return it("does not modify the options", function() {
          historyQuery.run(options, callback);
          return expect(historyQuery.options).toEqual(options);
        });
      });
      return describe("when searching is set in the options", function() {
        beforeEach(function() {
          return options = {
            searching: true
          };
        });
        it("sets the startTime to 0 on the options", function() {
          historyQuery.run(options, callback);
          return expect(historyQuery.options.startTime).toEqual(0);
        });
        return it("sets the maxResults to 0 on the options", function() {
          historyQuery.run(options, callback);
          return expect(historyQuery.options.maxResults).toEqual(0);
        });
      });
    });
    return describe("#searchHandler", function() {
      var results;
      results = null;
      beforeEach(function() {
        options = {
          text: 'value'
        };
        results = 'search results';
        return historyQuery.run(options, callback);
      });
      it("assigned the value of text back to the options", function() {
        historyQuery.searchHandler(results, callback);
        return expect(historyQuery.options.text).toEqual('value');
      });
      it("calls to the sanitizer to clean the results with the options", function() {
        historyQuery.searchHandler(results, callback);
        return expect(sanitizer.clean).toHaveBeenCalledWith(options, results);
      });
      return it("calls the passed callback with the cleaned results", function() {
        historyQuery.searchHandler(results, callback);
        return expect(callback).toHaveBeenCalledWith('cleaned results');
      });
    });
  });

}).call(this);
