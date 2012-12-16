describe 'BH.Models.Week', ->
  beforeEach ->
    @date = moment(new Date('October 8, 2012'))
    @week = new BH.Models.Week date: @date,
      settings: new BH.Models.Settings()

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
            title: '[translated monday]'
            inFuture: false
            url: '#days/10-8-12'
          }, {
            day: 'Tuesday'
            title: '[translated tuesday]'
            inFuture: false
            url: '#days/10-9-12'
          }, {
            day: 'Wednesday'
            title: '[translated wednesday]'
            inFuture: false
            url: '#days/10-10-12'
          }, {
            day: 'Thursday'
            title: '[translated thursday]'
            inFuture: false
            url: '#days/10-11-12'
          }, {
            day: 'Friday'
            title: '[translated friday]'
            inFuture: false
            url: '#days/10-12-12'
          }, {
            day: 'Saturday'
            title: '[translated saturday]'
            inFuture: false
            url: '#days/10-13-12'
          }, {
            day: 'Sunday'
            title: '[translated sunday]'
            inFuture: false
            url: '#days/10-14-12'
          }
        ]
        shortTitle: 'translated short_date'
        title: '[translated date_week_label]'
        id: '10-8-12'
        url: '#weeks/10-8-12'
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

