describe "BH.Lib.HistoryQuery", ->
  options = callback = chromeAPI = sanitizer = historyQuery = null

  beforeEach ->
    chromeAPI = loadChromeAPI()
    callback = jasmine.createSpy("callback")
    sanitizer = clean: jasmine.createSpy('clean').andReturn('cleaned results')
    historyQuery = new BH.Lib.HistoryQuery(chromeAPI, sanitizer)

  describe "#run", ->
    beforeEach ->
      options = {text: 'search term'}

    it "calls to chrome history API with the options and callback", ->
      historyQuery.run(options, callback)
      expect(chromeAPI.history.search).toHaveBeenCalledWith(options, jasmine.any(Function))

    describe "when searching is not set on the options", ->
      it "calls to chrome history API with the passed options and a callback", ->
        historyQuery.run(options, callback)
        expect(chromeAPI.history.search).toHaveBeenCalledWith(options, jasmine.any(Function))

    describe "when searching is set in the options", ->
      beforeEach ->
        options = {searching: true, text: 'the search'}

      it "calls to chrome history API with the searching property option removed, search options added, and callback", ->
        historyQuery.run(options, callback)
        searchOptions = {}
        _.extend(searchOptions, options, historyQuery.searchOptions)
        delete searchOptions.searching
        expect(chromeAPI.history.search).toHaveBeenCalledWith(searchOptions, jasmine.any(Function))


  describe "#searchHandler", ->
    results = null

    beforeEach ->
      options = text: 'value'
      results = 'search results'
      historyQuery.run(options, callback)

    it "assigned the value of text back to the options", ->
      historyQuery.searchHandler(results, callback)
      expect(historyQuery.options.text).toEqual('value')

    it "calls to the sanitizer to clean the results with the options", ->
      historyQuery.searchHandler(results, callback)
      expect(sanitizer.clean).toHaveBeenCalledWith(options, results)

    it "calls the passed callback with the cleaned results", ->
      historyQuery.searchHandler(results, callback)
      expect(callback).toHaveBeenCalledWith('cleaned results')
