describe "BH.Lib.HistoryQuery", ->
  options = callback = chromeAPI = historyQuery = null

  beforeEach ->
    spyOn(window, 'worker')
    chromeAPI = loadChromeAPI()
    callback = jasmine.createSpy("callback")
    historyQuery = new BH.Lib.HistoryQuery(chromeAPI)

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
      results = [
        {url: 'google.com', lastVisitTime: 'May 5 2010'},
        {url: 'yahoo.com', lastVisitTime: 'May 6 2010'}
      ]
      historyQuery.run(options, callback)

    it 'starts the sanitize worker with options, prepared results and a callback', ->
      historyQuery.searchHandler(results, callback)
      expectedOptions = {
        options: options,
        results: [
          {
            url: 'google.com',
            lastVisitTime: 'May 5 2010',
            date: new Date('May 5 2010')
            time: 'Wednesday, May 5th, 2010',
          },
          {
            url: 'yahoo.com',
            lastVisitTime: 'May 6 2010',
            time: 'Thursday, May 6th, 2010',
            date: new Date('May 6 2010')
          }
        ]
      }
      expect(worker).toHaveBeenCalledWith('sanitizer', expectedOptions, callback)
