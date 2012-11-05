describe 'DayGrouper', ->
  beforeEach ->
    @dayGrouper = new DayGrouper()

  describe '#initialize', ->
    it 'prepares an object of empty arrays for the week', ->
      expect(@dayGrouper.dayGroupedVisits).toEqual
        Monday: []
        Tuesday: []
        Wednesday: []
        Thursday: []
        Friday: []
        Saturday: []
        Sunday: []

  describe '#run', ->
    beforeEach ->
      @visit1 = lastVisitTime: new Date('11/4/12 4:00 PM').getTime()
      @visit2 = lastVisitTime: new Date('11/2/12 3:00 AM').getTime()
      @visit3 = lastVisitTime: new Date('11/3/12 6:00 AM').getTime()
      @visit4 = lastVisitTime: new Date('10/31/12 2:00 AM').getTime()
      @visit5 = lastVisitTime: new Date('11/3/12 4:00 PM').getTime()
      @visit6 = lastVisitTime: new Date('10/31/12 3:00 AM').getTime()
      @visit7 = lastVisitTime: new Date('11/3/12 11:00 PM').getTime()
      @visit8 = lastVisitTime: new Date('11/5/12 4:00 PM').getTime()

      @visits = [
        @visit1, @visit2, @visit3, @visit4
        @visit5, @visit6, @visit7, @visit8
      ]
    it 'returns an week object of visits grouped by day', ->
      expect(@dayGrouper.run(@visits)).toEqual
        Monday: [@visit8]
        Tuesday: []
        Wednesday: [@visit4, @visit6]
        Thursday: []
        Friday: [@visit2]
        Saturday: [@visit3, @visit5, @visit7]
        Sunday: [@visit1]
