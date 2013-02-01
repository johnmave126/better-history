describe "BH.Lib.HistoryQuery", ->
  beforeEach ->
    @callback = jasmine.createSpy("callback")
    @historyQuery = new BH.Lib.HistoryQuery()
    @chromeAPI = @historyQuery.chromeAPI

  describe "#run", ->
    beforeEach ->
      @options = {text: 'search term'}

    it "calls to chrome history API with the passed options and a callback", ->
      @historyQuery.run(@options, @callback)
      options = text: '', maxResults: 5000
      expect(@chromeAPI.history.search).toHaveBeenCalledWith(options, jasmine.any(Function))

  describe '#assembleSearchOptions', ->
    describe 'when searching', ->
      beforeEach ->
        @options = searching: true, property: true

      it 'adds startTime, maxResults, and removes searching from the options', ->
        expect(@historyQuery.assembleSearchOptions(@options)).toEqual
          startTime: 0
          maxResults: 0
          property: true

    describe 'when not searching', ->
      describe 'when maxResults is not set', ->
        beforeEach ->
          @options = property: true

        it 'adds maxResults to the options', ->
          expect(@historyQuery.assembleSearchOptions(@options)).toEqual
            maxResults: 5000
            property: true

      describe 'when maxResults is set', ->
        beforeEach ->
          @options = property: true, maxResults: 5

        it 'does not override maxResults', ->
          expect(@historyQuery.assembleSearchOptions(@options)).toEqual
            maxResults: 5
            property: true


    describe 'when a text property is set', ->
      beforeEach ->
        @options = text: 'search string', property: true, maxResults: 5

      it 'blanks the text property', ->
        expect(@historyQuery.assembleSearchOptions(@options)).toEqual
          property: true
          maxResults: 5
          text: ''

  describe '#sanitizeResults', ->
    beforeEach ->
      spyOn(@historyQuery, 'worker')
      @historyQuery.options = property: true

    it 'calls to the sanitie worker with the original options and a callback', ->
      @historyQuery.sanitizeResults(['results'], @callback)
      options = options: {property: true}, results: ['results']
      expect(@historyQuery.worker).toHaveBeenCalledWith('sanitizer', options, @callback)

    describe 'when text has been saved from the original options', ->
      it 'adding the text to the options passed to the worker', ->
        @historyQuery.text = 'term'
        @historyQuery.sanitizeResults(['results'], @callback)
        options = options: {property: true, text: 'term'}, results: ['results']
        expect(@historyQuery.worker).toHaveBeenCalledWith('sanitizer', options, @callback)

  describe '#prepareResults', ->
    it 'adds a date and a translated formal date and local time to each result', ->
      results = [{lastVisitTime: 1359691782239}]
      expect(@historyQuery.prepareResults(results)).toEqual [
        {
          lastVisitTime: 1359691782239
          date: new Date(1359691782239)
          extendedDate: 'translated extended_formal_date'
          time: 'translated local_time'
        }
      ]
