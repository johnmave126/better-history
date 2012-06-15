(function() {

  describe("BH.Helpers.UrlBuilder", function() {
    var urlBuilder;
    urlBuilder = null;
    beforeEach(function() {
      return urlBuilder = new BH.Helpers.UrlBuilder();
    });
    return describe(".build", function() {
      describe("when the passed key is 'base'", function() {
        return it("returns the base url", function() {
          return expect(urlBuilder.build('base')).toEqual("chrome://history/");
        });
      });
      describe("when the passed key is 'search'", function() {
        it("returns a relative search url for the text passed when no options are provided", function() {
          var text;
          text = "search this";
          return expect(urlBuilder.build('search', [text])).toEqual("#search/" + text);
        });
        it("returns a relative search url for the text passed when the absolute option is false", function() {
          var options, text;
          text = "search this";
          options = {
            absolute: false
          };
          return expect(urlBuilder.build('search', [text], options)).toEqual("#search/" + text);
        });
        return it("returns an absolute search url for the text passed when the absolute option is true", function() {
          var options, text;
          text = "search this";
          options = {
            absolute: true
          };
          return expect(urlBuilder.build('search', [text], options)).toEqual("chrome://history/#search/" + text);
        });
      });
      describe("when the passed key is 'week'", function() {
        it("returns a relative week url for the id passed when when no options are provided", function() {
          var id;
          id = "3-23-10";
          return expect(urlBuilder.build('week', [id])).toEqual("#weeks/" + id);
        });
        it("returns a relative week url for the id passed when when the absolute options is false", function() {
          var id, options;
          id = "3-23-10";
          options = {
            absolute: false
          };
          return expect(urlBuilder.build('week', [id], options)).toEqual("#weeks/" + id);
        });
        return it("returns an absolute week url for the id passed when when the absolute options is true", function() {
          var id, options;
          id = "3-23-10";
          options = {
            absolute: true
          };
          return expect(urlBuilder.build('week', [id], options)).toEqual("chrome://history/#weeks/" + id);
        });
      });
      return describe("when the passed key is 'day'", function() {
        it("returns a relative day url for the week id and day id passed when no options are provided", function() {
          var dayId, weekId;
          weekId = "3-23-10";
          dayId = "24";
          return expect(urlBuilder.build('day', [weekId, dayId])).toEqual("#weeks/" + weekId + "/days/" + dayId);
        });
        it("returns a relative day url for the week id and day id passed when the absolute option is false", function() {
          var dayId, options, weekId;
          weekId = "3-23-10";
          dayId = "24";
          options = {
            absolute: false
          };
          return expect(urlBuilder.build('day', [weekId, dayId], options)).toEqual("#weeks/" + weekId + "/days/" + dayId);
        });
        return it("returns an absolute day url for the week id and day id passed when the absolute option is true", function() {
          var dayId, options, weekId;
          weekId = "3-23-10";
          dayId = "24";
          options = {
            absolute: true
          };
          return expect(urlBuilder.build('day', [weekId, dayId], options)).toEqual("chrome://history/#weeks/" + weekId + "/days/" + dayId);
        });
      });
    });
  });

}).call(this);
