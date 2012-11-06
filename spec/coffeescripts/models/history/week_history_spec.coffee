describe 'BH.Models.WeekHistory', ->
  beforeEach ->
    @startDate = moment(new Date('October 11, 2012'))
    @endDate = moment(new Date('October 17, 2012'))
    @weekHistory = new BH.Models.WeekHistory
      startDate: @startDate
      endDate: @endDate
      history:
        Monday: [1]
        Tuesday: [1, 2, 3]
        Wednesday: [1, 2, 3, 4]
        Thursday: [1]
        Friday: [1, 2]
        Saturday: []
        Sunday: [1]

    @weekHistory.chromeAPI = loadChromeAPI()

  describe '#toChrome', ->
    it 'returns the reading properties when reading is true', ->
      expect(@weekHistory.toChrome()).toEqual
        startTime: new Date(@startDate.sod()).getTime()
        endTime: new Date(@endDate.eod()).getTime()
        text: ''

    it 'returns the deleting properties when reading is false', ->
      expect(@weekHistory.toChrome(false)).toEqual
        startTime: new Date(@startDate.sod()).getTime()
        endTime: new Date(@endDate.eod()).getTime()

  describe '#toTemplate', ->
    it 'returns the properties for the view template', ->
      expect(@weekHistory.toTemplate()).toEqual
        total: 12
        days: [
          {
            count: 1
            day: 'Monday'
            percentage: '25%'
          }, {
            count: 3
            day: 'Tuesday'
            percentage: '75%'
          }, {
            count: 4
            day: 'Wednesday'
            percentage: '100%'
          }, {
            count: 1
            day: 'Thursday'
            percentage: '25%'
          }, {
            count: 2
            day: 'Friday'
            percentage: '50%'
          }, {
            count: 0
            day: 'Saturday'
            percentage: '0%'
          }, {
            count: 1
            day: 'Sunday'
            percentage: '25%'
          }
        ]

  describe 'deleting history', ->
    beforeEach ->
      @deleteRange = @weekHistory.chromeAPI.history.deleteRange
      @deleteRange.andCallFake (options, callback) ->
        callback()

    it 'calls to the history delete method with params and callback', ->
      @weekHistory.destroy()
      expect(@deleteRange).toHaveBeenCalledWith
        startTime: new Date(@startDate.sod()).getTime()
        endTime: new Date(@endDate.eod()).getTime()
      , jasmine.any(Function)

    it 'resets the history', ->
      @weekHistory.destroy()
      expect(@weekHistory.get('history')).toEqual []

  describe 'fetching history', ->
    beforeEach ->
      spyOn(@weekHistory.historyQuery, 'run')

    it 'calls to history query with params and callback', ->
      @weekHistory.fetch()
      expect(@weekHistory.historyQuery.run).toHaveBeenCalledWith
        startTime: new Date(@startDate.sod()).getTime()
        endTime: new Date(@endDate.eod()).getTime()
        text: ''
      , jasmine.any(Function)

  describe '#dayVisits', ->
    beforeEach ->
    it 'returns the total amount of visits for each day', ->
      expect(@weekHistory.dayVisits()).toEqual [
        1, 3, 4, 1, 2, 0, 1
      ]

  describe '#totalVisits', ->
    it 'returns the total amount of visits for the week', ->
      expect(@weekHistory.totalVisits()).toEqual 12

  describe '#dayVisitPercentage', ->
    it 'returns the percentage of visits for the passed day relative to the visit sums of each day', ->
      expect(@weekHistory.dayVisitPercentage('Monday')).toEqual 25
      expect(@weekHistory.dayVisitPercentage('Wednesday')).toEqual 100
      expect(@weekHistory.dayVisitPercentage('Saturday')).toEqual 0

