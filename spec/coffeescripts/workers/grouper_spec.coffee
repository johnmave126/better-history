describe 'Grouper', ->
  grouper = visit1 = visit2 = visit3 = visit4 = null

  beforeEach ->
    grouper = new Grouper()

    visit1 = new BH.Models.Visit
      title: 'test'
      url: 'http://www.google.com/a_page'
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 4)

    visit2 = new BH.Models.Visit
      title: 'another test'
      url: 'yahoo.com'
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 5)

    visit3 = new BH.Models.Visit
      title: 'test again'
      url: 'aol.com'
      lastVisitTime: new Date(2011, 5, 5, 5, 6, 5)

    visit4 = new BH.Models.Visit
      title: 'test again'
      url: 'http://www.google.com/another_page'
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 5)

  describe '#time', ->
    it 'stores the time in 24 hours, the date to the nearest time interval, and the page visits', ->
      visits = new BH.Collections.Visits([visit1, visit2])
      timeVisits = grouper.run(visits.toJSON(), 15)
      expect(timeVisits[0]).toEqual
        datetime: new Date(2011, 5, 5, 3, 0, 0)
        id: '3:00'
        visits: visits.toJSON()

    it 'groups history items by 15 minute increments when passed 15', ->
      visits = new BH.Collections.Visits([visit1, visit2])
      timeVisits = grouper.run(visits.toJSON(), 15)
      expect(timeVisits.length).toEqual(1)

    it 'separates history items that are more than 15 minutes apart when passed 15', ->
      visits = new BH.Collections.Visits([visit1, visit3])
      timeVisits = grouper.run(visits.toJSON(), 15)
      expect(timeVisits.length).toEqual(2)
