describe 'BH.Models.DayHistory', ->
  beforeEach ->
    @date = moment(new Date('October 11, 2012'))
    @dayHistory = new BH.Models.DayHistory
      date: @date
    @dayHistory.chromeAPI = loadChromeAPI()

  describe '#initialize', ->
    it 'sets history to an empty array', ->
      expect(@dayHistory.get('history')).toEqual []

  describe '#isNew', ->
    it 'returns false', ->
      expect(@dayHistory.isNew()).toBeFalsy()

  describe '#toChrome', ->
    it 'returns the reading properties when reading is true', ->
      expect(@dayHistory.toChrome()).toEqual
        startTime: 1349931600000
        endTime: 1350017999999
        text: ''

    it 'returns the deleting properties when reading is false', ->
      expect(@dayHistory.toChrome(false)).toEqual
        startTime: 1349931600000
        endTime: 1350017999999

  describe '#toTemplate', ->
    beforeEach ->
      templatedDataSpy = jasmine.createSpy('toTemplate').andReturn('templated data')
      @dayHistory.set
        history: [
          {toTemplate: -> templatedDataSpy()},
          {toTemplate: -> templatedDataSpy()}
        ]

    it 'returns the properties for the view template', ->
      expect(@dayHistory.toTemplate()).toEqual
        history: ['templated data', 'templated data']

  describe '#isEmpty', ->
    it 'returns true when history is empty', ->
      expect(@dayHistory.isEmpty()).toBeTruthy()

    it 'returns false when history is not empty', ->
      @dayHistory.set history: ['visits']
      expect(@dayHistory.isEmpty()).toBeFalsy()

  describe 'deleting history', ->
    beforeEach ->
      @deleteRange = @dayHistory.chromeAPI.history.deleteRange
      @deleteRange.andCallFake (options, callback) ->
        callback()

    it 'calls to the history delete method with params and callback', ->
      @dayHistory.destroy()
      expect(@deleteRange).toHaveBeenCalledWith
        startTime: 1349931600000
        endTime: 1350017999999
      , jasmine.any(Function)

    it 'resets the history', ->
      @dayHistory.destroy()
      expect(@dayHistory.get('history')).toEqual []

  describe 'fetching history', ->
    beforeEach ->
      spyOn(@dayHistory.historyQuery, 'run')

    it 'calls to history query with params and callback', ->
      @dayHistory.fetch()
      expect(@dayHistory.historyQuery.run).toHaveBeenCalledWith
        startTime: 1349931600000
        endTime: 1350017999999
        text: ''
      , jasmine.any(Function)

  describe '#preparse', ->
    beforeEach ->
      spyOn(window, 'worker')
      window.settings =
        get: jasmine.createSpy('get').andCallFake (property) ->
          if property == 'timeGrouping'
            15
          else if property == 'domainGrouping'
            true

    it 'loads the grouper worker with config and callback', ->
      config =
        visits: 'results'
        interval: 15
        domainGrouping: true
      callback = jasmine.any(Function)

      @dayHistory.preparse('results', callback)
      expect(worker).toHaveBeenCalledWith 'grouper', config, callback

