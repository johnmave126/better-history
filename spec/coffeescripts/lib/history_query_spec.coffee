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
      it "does not modify the options", ->
        historyQuery.run(options, callback)
        expect(historyQuery.options).toEqual(options)

    describe "when searching is set in the options", ->
      beforeEach ->
        options = {searching: true}

      it "sets the startTime to 0 on the options", ->
        historyQuery.run(options, callback)
        expect(historyQuery.options.startTime).toEqual(0)

      it "sets the maxResults to 0 on the options", ->
        historyQuery.run(options, callback)
        expect(historyQuery.options.maxResults).toEqual(0)

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
