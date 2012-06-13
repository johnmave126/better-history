describe "BH.Lib.UrlBuilder", ->
  urlBuilder = null

  beforeEach ->
    urlBuilder = new BH.Lib.UrlBuilder()

  describe ".build", ->
    describe "when the passed key is 'base'", ->
      it "returns the base url", ->
        expect(urlBuilder.build('base')).toEqual "chrome://history/"

    describe "when the passed key is 'search'", ->
      it "returns a relative search url for the text passed when no options are provided", ->
        text = "search this"
        expect(urlBuilder.build('search', [text])).toEqual "#search/#{text}"

      it "returns a relative search url for the text passed when the absolute option is false", ->
        text = "search this"
        options = {absolute: false}
        expect(urlBuilder.build('search', [text], options)).toEqual "#search/#{text}"

      it "returns an absolute search url for the text passed when the absolute option is true", ->
        text = "search this"
        options = {absolute: true}
        expect(urlBuilder.build('search', [text], options)).toEqual "chrome://history/#search/#{text}"

    describe "when the passed key is 'week'", ->
      it "returns a relative week url for the id passed when when no options are provided", ->
        id = "3-23-10"
        expect(urlBuilder.build('week', [id])).toEqual "#weeks/#{id}"

      it "returns a relative week url for the id passed when when the absolute options is false", ->
        id = "3-23-10"
        options = {absolute: false}
        expect(urlBuilder.build('week', [id], options)).toEqual "#weeks/#{id}"

      it "returns an absolute week url for the id passed when when the absolute options is true", ->
        id = "3-23-10"
        options = {absolute: true}
        expect(urlBuilder.build('week', [id], options)).toEqual "chrome://history/#weeks/#{id}"

    describe "when the passed key is 'day'", ->
      it "returns a relative day url for the week id and day id passed when no options are provided", ->
        weekId = "3-23-10"
        dayId = "24"
        expect(urlBuilder.build('day', [weekId, dayId])).toEqual "#weeks/#{weekId}/days/#{dayId}"

      it "returns a relative day url for the week id and day id passed when the absolute option is false", ->
        weekId = "3-23-10"
        dayId = "24"
        options = {absolute: false}
        expect(urlBuilder.build('day', [weekId, dayId], options)).toEqual "#weeks/#{weekId}/days/#{dayId}"

      it "returns an absolute day url for the week id and day id passed when the absolute option is true", ->
        weekId = "3-23-10"
        dayId = "24"
        options = {absolute: true}
        expect(urlBuilder.build('day', [weekId, dayId], options)).toEqual "chrome://history/#weeks/#{weekId}/days/#{dayId}"
