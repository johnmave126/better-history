describe "BH.Helpers.UrlBuilder", ->
  beforeEach ->
    @urlBuilder = BH.Helpers.UrlBuilder

  describe ".build", ->
    describe "when called with no options", ->
      it "returns the base url", ->
        expect(@urlBuilder.build()).toEqual "chrome://history/"

    describe "generating a search url", ->
      it "returns a relative search url for the text passed", ->
        expect(@urlBuilder.build('search', 'search term')).toEqual "#search/search term"

    describe "generating a week url", ->
      it "returns a relative week url for the id passed", ->
        expect(@urlBuilder.build('week', '3-23-10')).toEqual "#weeks/3-23-10"

    describe "generating a day url", ->
      it "returns a relative day url for the day param passed", ->
        expect(@urlBuilder.build('day', '2-24-10')).toEqual "#days/2-24-10"

    describe "generating an absolute url", ->
      it "returns an absolute url when passed the absolute option is true", ->
        options = absolute: true

        expect(@urlBuilder.build('day', '2-24-10', options)).toEqual "chrome://history/#days/2-24-10"
        expect(@urlBuilder.build('week', '3-23-10', options)).toEqual "chrome://history/#weeks/3-23-10"
        expect(@urlBuilder.build('search', 'term', options)).toEqual "chrome://history/#search/term"
