describe 'BH.Models.Week', ->
  beforeEach ->
    @date = moment(new Date('October 8, 2012'))
    @week = new BH.Models.Week
      date: @date
    @week.chromeAPI = loadChromeAPI()

  describe '#initialize', ->
    it 'sets the id', ->
      expect(@week.id).toEqual('10-8-12')

  describe '#toHistory', ->
    it 'returns the needed properties for the history API', ->
      expect(@week.toHistory()).toEqual
        startDate: @date
        endDate: moment(new Date('October 14, 2012'))

  describe '#toTemplate', ->
    it 'returns the properties needed for a view template', ->
      expect(@week.toTemplate()).toEqual
        days: [
          {
            day: 'Monday'
            title: 'Monday'
            inFuture: false
            url: '#days/10-8-12'
          }, {
            day: 'Tuesday'
            title: 'Tuesday'
            inFuture: false
            url: '#days/10-9-12'
          }, {
            day: 'Wednesday'
            title: 'Wednesday'
            inFuture: false
            url: '#days/10-10-12'
          }, {
            day: 'Thursday'
            title: 'Thursday'
            inFuture: false
            url: '#days/10-11-12'
          }, {
            day: 'Friday'
            title: 'Friday'
            inFuture: false
            url: '#days/10-12-12'
          }, {
            day: 'Saturday'
            title: 'Saturday'
            inFuture: false
            url: '#days/10-13-12'
          }, {
            day: 'Sunday'
            title: 'Sunday'
            inFuture: false
            url: '#days/10-14-12'
          }
        ]
        shortTitle: 'October 8th'
        title: 'Week of Monday, October 8th'
        id: '10-8-12'
        date: @date

  describe '#inflateDays', ->
    it 'returns an array of all the days in the week', ->
      expect(@week.inflateDays()).toEqual [
        moment(new Date('October 8, 2012')),
        moment(new Date('October 9, 2012')),
        moment(new Date('October 10, 2012')),
        moment(new Date('October 11, 2012')),
        moment(new Date('October 12, 2012')),
        moment(new Date('October 13, 2012')),
        moment(new Date('October 14, 2012'))
      ]

