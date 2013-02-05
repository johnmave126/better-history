describe "BH.Lib.HistoryQuery", ->
  beforeEach ->
    @callback = jasmine.createSpy("callback")
    @historyQuery = new BH.Lib.HistoryQuery()
    @chromeAPI = @historyQuery.chromeAPI

  describe "#run", ->
    beforeEach ->
      @options = {text: ''}

    it "calls to chrome history API with the passed options and a callback", ->
      @historyQuery.run(@options, @callback)
      options = text: '', maxResults: 5000
      expect(@chromeAPI.history.search).toHaveBeenCalledWith(options, jasmine.any(Function))

  describe '#assembleSearchOptions', ->
    describe 'when the text property is not blank (when searching)', ->
      beforeEach ->
        @options = text: 'search string', property: true

      it 'adds startTime and maxResults to the options and blanks text', ->
        expect(@historyQuery.assembleSearchOptions(@options)).toEqual
          startTime: 0
          maxResults: 0
          text: ''
          property: true

    describe 'when the text property is blank (when not searching)', ->
      describe 'when maxResults is not set', ->
        beforeEach ->
          @options = property: true, text: ''

        it 'adds maxResults to the options', ->
          options = @historyQuery.assembleSearchOptions(@options)
          expect(options.maxResults).toEqual 5000

      describe 'when maxResults is set', ->
        beforeEach ->
          @options = property: true, maxResults: 5, text: ''

        it 'does not override maxResults', ->
          options = @historyQuery.assembleSearchOptions(@options)
          expect(options.maxResults).toEqual 5

  describe '#sanitizeResults', ->
    beforeEach ->
      spyOn(@historyQuery, 'worker')
      @historyQuery.options = property: true

    it 'calls to the sanitize worker with the original options and a callback', ->
      @historyQuery.sanitizeResults(property: true, ['results'], @callback)
      options = options: {property: true}, results: ['results']
      expect(@historyQuery.worker).toHaveBeenCalledWith('sanitizer', options, @callback)

    describe 'when text has been saved from the original options', ->
      it 'adds the text to the options passed to the worker', ->
        @historyQuery.text = 'term'
        @historyQuery.sanitizeResults(property: true, ['results'], @callback)
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
