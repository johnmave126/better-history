describe 'BH.Models.Day', ->
  beforeEach ->
    settings = new BH.Models.Settings {startingWeekDay: 'Monday'}, chromeAPI: loadChromeAPI()

    @date = moment(new Date('October 11, 2012'))
    @day = new BH.Models.Day {date: @date}, settings: settings
    @day.chromeAPI = loadChromeAPI()

  describe '#initialize', ->
    it 'sets the id', ->
      expect(@day.id).toEqual('10-11-12')

  describe '#toHistory', ->
    it 'returns the needed properties for the history API', ->
      expect(@day.toHistory()).toEqual
        date: @date

  describe '#toTemplate', ->
    beforeEach ->
      window.settings =
        get: jasmine.createSpy('get').andReturn 'Monday'

    it 'returns the properties needed for a view template', ->
      expect(@day.toTemplate()).toEqual
        title: 'Thursday'
        formalDate: 'October 11th 2012'
        weekUrl: '#weeks/10-8-12'
        id: '10-11-12'
        date: @date
