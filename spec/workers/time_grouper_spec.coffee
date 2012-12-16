describe 'BH.Workers.TimeGrouper', ->
  beforeEach ->
    @timeGrouper = new BH.Workers.TimeGrouper()

  describe '#constructor', ->
    it 'creates an empty arranged visits array', ->
      expect(@timeGrouper.arrangedVisits).toEqual []

  describe '#run', ->
    describe 'when grouping to 15 minutes', ->
      beforeEach ->
        @visit1 =
          lastVisitTime: new Date('11/3/12 12:03 PM').getTime()
        @visit2 =
          lastVisitTime: new Date('11/3/12 12:10 PM').getTime()
        @visit3 =
          lastVisitTime: new Date('11/3/12 12:17 PM').getTime()
        @visit4 =
          lastVisitTime: new Date('11/3/12 3:59 PM').getTime()

        @visits = [@visit1, @visit2, @visit3, @visit4]

      it 'returns an array of grouped visits grouped into 15 minute intervals', ->
        options = interval: 15
        expect(@timeGrouper.run(@visits, options)).toEqual [
          {
            datetime: new Date('11/3/12 12:15')
            id: '12:15'
            visits: [@visit1, @visit2]
          },
          {
            datetime: new Date('11/3/12 12:30')
            id: '12:30'
            visits: [@visit3]
          },
          {
            datetime: new Date('11/3/12 16:00')
            id: '16:00'
            visits: [@visit4]
          }
        ]

    describe 'when grouping to 30 minutes', ->
      beforeEach ->
        @visit1 =
          lastVisitTime: new Date('11/3/12 10:05 AM').getTime()
        @visit2 =
          lastVisitTime: new Date('11/3/12 11:45 AM').getTime()
        @visit3 =
          lastVisitTime: new Date('11/3/12 1:02 PM').getTime()
        @visit4 =
          lastVisitTime: new Date('11/3/12 11:29 PM').getTime()

        @visits = [@visit1, @visit2, @visit3, @visit4]

      it 'returns an array of grouped visits grouped into 30 minute intervals', ->
        options = interval: 30
        expect(@timeGrouper.run(@visits, options)).toEqual [
          {
            datetime: new Date('11/3/12 10:30 AM')
            id: '10:30'
            visits: [@visit1]
          },
          {
            datetime: new Date('11/3/12 12:00 PM')
            id: '12:00'
            visits: [@visit2]
          },
          {
            datetime: new Date('11/3/12 1:30 PM')
            id: '13:30'
            visits: [@visit3]
          },
          {
            datetime: new Date('11/3/12 11:30 PM')
            id: '23:30'
            visits: [@visit4]
          }
        ]

    describe 'when grouping to 60 minutes', ->
      beforeEach ->
        @visit1 =
          lastVisitTime: new Date('11/3/12 10:05 AM').getTime()
        @visit2 =
          lastVisitTime: new Date('11/3/12 10:45 AM').getTime()
        @visit3 =
          lastVisitTime: new Date('11/3/12 3:36 PM').getTime()
        @visit4 =
          lastVisitTime: new Date('11/3/12 3:59 PM').getTime()

        @visits = [@visit1, @visit2, @visit3, @visit4]

      it 'returns an array of grouped visits grouped into 60 minute intervals', ->
        options = interval: 60
        expect(@timeGrouper.run(@visits, options)).toEqual [
          {
            datetime: new Date('11/3/12 11:00')
            id: '11:00'
            visits: [@visit1, @visit2]
          },
          {
            datetime: new Date('11/3/12 16:00')
            id: '16:00'
            visits: [@visit3, @visit4]
          }
        ]

