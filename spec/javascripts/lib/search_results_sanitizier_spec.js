(function() {

  describe("BH.Lib.SearchResultsSanitizer", function() {
    var chromeAPI, results, searchResultsSanitizer;
    chromeAPI = results = searchResultsSanitizer = null;
    beforeEach(function() {
      results = [];
      chromeAPI = loadChromeAPI();
      return searchResultsSanitizer = new BH.Lib.SearchResultsSanitizer(chromeAPI);
    });
    it("returns a max of 100 results when searching", function() {
      var a, cleanedResults;
      a = 0;
      while (a < 150) {
        results.push({
          title: "title",
          url: "google.com",
          lastVisitTime: new Date()
        });
        a++;
      }
      cleanedResults = searchResultsSanitizer.clean({
        text: 'title',
        searching: true
      }, results);
      return expect(cleanedResults.length).toEqual(100);
    });
    it("returns as many results as found when filtering by date", function() {
      var a, cleanedResults;
      a = 0;
      while (a < 150) {
        results.push({
          title: "title",
          url: "google.com",
          lastVisitTime: new Date("December 5, 2011 12:00")
        });
        a++;
      }
      cleanedResults = searchResultsSanitizer.clean({
        startTime: new Date("December 5, 2011 0:00"),
        endTime: new Date("December 5, 2011 23:59")
      }, results);
      return expect(cleanedResults.length).toEqual(150);
    });
    describe("Additional properties", function() {
      it("sets a property called location to be equal to the url", function() {
        var cleanedResults;
        results = [
          {
            title: "testing",
            url: "gooogle.com",
            lastVisitTime: new Date("October 12, 2010")
          }
        ];
        cleanedResults = searchResultsSanitizer.clean({
          startTime: new Date("October 1, 2010"),
          endTime: new Date("October 14, 2010")
        }, results);
        return expect(cleanedResults[0].location).toEqual(results[0].url);
      });
      return it("sets a property called time to be a formatted lastVisitTime", function() {
        var cleanedResults;
        results = [
          {
            title: "testing",
            url: "gooogle.com",
            lastVisitTime: new Date("October 12, 2010")
          }
        ];
        cleanedResults = searchResultsSanitizer.clean({
          startTime: new Date("October 1, 2010"),
          endTime: new Date("October 14, 2010")
        }, results);
        return expect(cleanedResults[0].time).toEqual("Tuesday, October 12th, 2010");
      });
    });
    describe("Wrapping search terms", function() {
      it("wraps search terms in the title", function() {
        var cleanedResults;
        results = [
          {
            title: "September month news",
            url: "google.com",
            lastVisitTime: new Date("December 2, 2010")
          }
        ];
        cleanedResults = searchResultsSanitizer.clean({
          searching: true,
          text: "september news"
        }, results);
        return expect(cleanedResults[0].title).toEqual("<span class=\"match\">September</span> month <span class=\"match\">news</span>");
      });
      it("wraps search terms in the location", function() {
        var cleanedResults;
        results = [
          {
            title: "Normal news",
            url: "google.com/september",
            lastVisitTime: new Date("July 2, 2010")
          }
        ];
        cleanedResults = searchResultsSanitizer.clean({
          searching: true,
          text: "september"
        }, results);
        return expect(cleanedResults[0].location).toEqual("google.com/<span class=\"match\">september</span>");
      });
      return it("wraps search terms in the time", function() {
        var cleanedResults;
        results = [
          {
            title: "other",
            url: "yahoo.com",
            lastVisitTime: new Date("September 12, 2010")
          }
        ];
        cleanedResults = searchResultsSanitizer.clean({
          searching: true,
          text: "september"
        }, results);
        return expect(cleanedResults[0].time).toEqual("Sunday, <span class=\"match\">September</span> 12th, 2010");
      });
    });
    describe("Removing script tags", function() {
      it("removes any script tags in the title", function() {
        var cleanedResults;
        results = [
          {
            title: "test<script>alert(\"yo\")</script>",
            url: "yahoo.com",
            lastVisitTime: new Date("September 12, 2010")
          }
        ];
        cleanedResults = searchResultsSanitizer.clean({
          text: "test",
          searching: true
        }, results);
        return expect(cleanedResults[0].title).toEqual("<span class=\"match\">test</span>");
      });
      return it("removes any script tags in the url", function() {
        var cleanedResults;
        results = [
          {
            title: "test",
            url: "yahoo.com<script>alert(\"yo\")</script>",
            lastVisitTime: new Date("September 12, 2010")
          }
        ];
        cleanedResults = searchResultsSanitizer.clean({
          text: "yahoo",
          searching: true
        }, results);
        return expect(cleanedResults[0].location).toEqual("<span class=\"match\">yahoo</span>.com");
      });
    });
    it("matches results by checking if the search term exists in the title, url, or last visit time", function() {
      var cleanedResults, visit1, visit2, visit3;
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
      cleanedResults = searchResultsSanitizer.clean({
        searching: true,
        text: "september something"
      }, results);
      return expect(cleanedResults).toEqual([visit1, visit3, visit2]);
    });
    it("orders the matched results by lastVisitTime", function() {
      var cleanedResults, visit1, visit2, visit3, visit4;
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
      cleanedResults = searchResultsSanitizer.clean({
        text: "news",
        searching: true
      }, results);
      return expect(cleanedResults).toEqual([visit2, visit3, visit1, visit4]);
    });
    return it("matches results by checking if the date falls between the searched ranges", function() {
      var cleanedResults, visit1, visit2;
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
      cleanedResults = searchResultsSanitizer.clean({
        startTime: new Date("October 1, 2010"),
        endTime: new Date("October 14, 2010")
      }, results);
      return expect(cleanedResults).toEqual([visit2, visit1]);
    });
  });

}).call(this);
