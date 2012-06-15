(function() {

  describe("BH.Lib.HistoryQuery", function() {
    var callback, chromeAPI, historyQuery, options, results;
    historyQuery = null;
    options = void 0;
    callback = void 0;
    results = void 0;
    chromeAPI = null;
    beforeEach(function() {
      options = {
        text: "option"
      };
      results = [
        {
          title: "title",
          url: "google.com",
          lastVisitTime: new Date()
        }
      ];
      chromeAPI = loadChromeAPI();
      chromeAPI.history.search = jasmine.createSpy("search").andCallFake(function(o, callback) {
        return callback(results);
      });
      callback = jasmine.createSpy("callback");
      return historyQuery = new BH.Lib.HistoryQuery(chromeAPI);
    });
    describe("#run", function() {
      it("calls to chrome history API with the options and callback", function() {
        historyQuery.run(options, callback);
        return expect(chromeAPI.history.search).toHaveBeenCalledWith(options, jasmine.any(Function));
      });
      describe("when searching is set in the options", function() {
        beforeEach(function() {
          return options = {
            searching: true
          };
        });
        it("sets the startTime to 0", function() {
          historyQuery.run(options, callback);
          return expect(historyQuery.options.startTime).toEqual(0);
        });
        return it("sets the maxResults to 0", function() {
          historyQuery.run(options, callback);
          return expect(historyQuery.options.maxResults).toEqual(0);
        });
      });
      return describe("when searching is not set in the options", function() {
        beforeEach(function() {
          return options = {
            text: 'test'
          };
        });
        it("does not set the startTime", function() {
          historyQuery.run(options, callback);
          return expect(historyQuery.options.startTime).toBeUndefined();
        });
        return it("does not set the maxResults", function() {
          historyQuery.run(options, callback);
          return expect(historyQuery.options.maxResults).toBeUndefined();
        });
      });
    });
    it("returns a max of 100 results when searching", function() {
      var a;
      a = 0;
      while (a < 150) {
        results.push({
          title: "title",
          url: "google.com",
          lastVisitTime: new Date()
        });
        a++;
      }
      return historyQuery.run({
        text: 'title',
        searching: true
      }, function(results) {
        return expect(results.length).toEqual(100);
      });
    });
    it("returns as many results as found when filtering by date", function() {
      var a;
      a = 0;
      while (a < 150) {
        results.push({
          title: "title",
          url: "google.com",
          lastVisitTime: new Date("December 5, 2011 12:00")
        });
        a++;
      }
      return historyQuery.run({
        startTime: new Date("December 5, 2011 0:00"),
        endTime: new Date("December 5, 2011 23:59")
      }, function(results) {
        return expect(results.length).toEqual(150);
      });
    });
    describe("Additional properties", function() {
      it("sets a property called location to be equal to the url", function() {
        results = [
          {
            title: "testing",
            url: "gooogle.com",
            lastVisitTime: new Date("October 12, 2010")
          }
        ];
        return historyQuery.run({
          startTime: new Date("October 1, 2010"),
          endTime: new Date("October 14, 2010")
        }, function(results) {
          return expect(results[0].location).toEqual(results[0].url);
        });
      });
      return it("sets a property called time to be a formatted lastVisitTime", function() {
        results = [
          {
            title: "testing",
            url: "gooogle.com",
            lastVisitTime: new Date("October 12, 2010")
          }
        ];
        return historyQuery.run({
          startTime: new Date("October 1, 2010"),
          endTime: new Date("October 14, 2010")
        }, function(results) {
          return expect(results[0].time).toEqual("Tuesday, October 12th, 2010");
        });
      });
    });
    describe("Wrapping search terms", function() {
      it("wraps search terms in the title", function() {
        results = [
          {
            title: "September month news",
            url: "google.com",
            lastVisitTime: new Date("December 2, 2010")
          }
        ];
        return historyQuery.run({
          searching: true,
          text: "september news"
        }, function(results) {
          return expect(results[0].title).toEqual("<span class=\"match\">September</span> month <span class=\"match\">news</span>");
        });
      });
      it("wraps search terms in the location", function() {
        results = [
          {
            title: "Normal news",
            url: "google.com/september",
            lastVisitTime: new Date("July 2, 2010")
          }
        ];
        return historyQuery.run({
          searching: true,
          text: "september"
        }, function(results) {
          return expect(results[0].location).toEqual("google.com/<span class=\"match\">september</span>");
        });
      });
      return it("wraps search terms in the time", function() {
        results = [
          {
            title: "other",
            url: "yahoo.com",
            lastVisitTime: new Date("September 12, 2010")
          }
        ];
        return historyQuery.run({
          searching: true,
          text: "september"
        }, function(results) {
          return expect(results[0].time).toEqual("Sunday, <span class=\"match\">September</span> 12th, 2010");
        });
      });
    });
    describe("Removing script tags", function() {
      it("removes any script tags in the title", function() {
        results = [
          {
            title: "test<script>alert(\"yo\")</script>",
            url: "yahoo.com",
            lastVisitTime: new Date("September 12, 2010")
          }
        ];
        return historyQuery.run({
          text: "test",
          searching: true
        }, function(results) {
          return expect(results[0].title).toEqual("<span class=\"match\">test</span>");
        });
      });
      return it("removes any script tags in the url", function() {
        results = [
          {
            title: "test",
            url: "yahoo.com<script>alert(\"yo\")</script>",
            lastVisitTime: new Date("September 12, 2010")
          }
        ];
        return historyQuery.run({
          text: "yahoo",
          searching: true
        }, function(results) {
          return expect(results[0].location).toEqual("<span class=\"match\">yahoo</span>.com");
        });
      });
    });
    it("matches results by checking if the search term exists in the title, url, or last visit time", function() {
      var visit1, visit2, visit3;
      visit1 = {
        title: "September something",
        url: "google.com",
        lastVisitTime: new Date("December 2, 2010")
      };
      visit2 = {
        title: "Normal something",
        url: "google.com/september",
        lastVisitTime: new Date("July 2, 2010")
      };
      visit3 = {
        title: "something",
        url: "yahoo.com",
        lastVisitTime: new Date("September 12, 2010")
      };
      results = [
        {
          title: "hit september",
          url: "google.com"
        }, visit1, {
          title: "lame",
          url: "google.com/hit"
        }, visit2, {
          title: "no match",
          url: "google.com/something"
        }, visit3
      ];
      return historyQuery.run({
        searching: true,
        text: "september something"
      }, function(results) {
        return expect(results).toEqual([visit1, visit3, visit2]);
      });
    });
    it("orders the matched results by lastVisitTime", function() {
      var visit1, visit2, visit3, visit4;
      visit1 = {
        title: "news",
        url: "google.com",
        lastVisitTime: new Date("September 12, 2010 4:00")
      };
      visit2 = {
        title: "news",
        url: "google.com",
        lastVisitTime: new Date("July 2, 2011")
      };
      visit3 = {
        title: "news",
        url: "yahoo.com",
        lastVisitTime: new Date("September 12, 2010 12:00")
      };
      visit4 = {
        title: "news",
        url: "yahoo.com",
        lastVisitTime: new Date("September 12, 2010 2:00")
      };
      results = [
        {
          title: "hit this",
          url: "google.com"
        }, visit1, {
          title: "lame",
          url: "google.com/hit"
        }, visit2, {
          title: "no match",
          url: "google.com"
        }, visit3, visit4
      ];
      return historyQuery.run({
        text: "news",
        searching: true
      }, function(results) {
        return expect(results).toEqual([visit2, visit3, visit1, visit4]);
      });
    });
    return it("matches results by checking if the date falls between the searched ranges", function() {
      var visit1, visit2;
      visit1 = {
        title: "google",
        url: "google.com",
        lastVisitTime: new Date("October 12, 2010")
      };
      visit2 = {
        title: "sample",
        url: "google.com/sample",
        lastVisitTime: new Date("October 13, 2010")
      };
      results = [
        visit1, {
          title: "hit",
          url: "google.com/hit",
          lastVisitTime: new Date("December 5, 2010")
        }, visit2
      ];
      return historyQuery.run({
        startTime: new Date("October 1, 2010"),
        endTime: new Date("October 14, 2010")
      }, function(results) {
        return expect(results).toEqual([visit2, visit1]);
      });
    });
  });

}).call(this);
