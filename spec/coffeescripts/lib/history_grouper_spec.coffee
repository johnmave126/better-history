describe 'BH.Lib.HistoryGrouper', ->
  historyGrouper = pageVisit1 = pageVisit2 = pageVisit3 = pageVisit4 = null

  beforeEach ->
    historyGrouper = new BH.Lib.HistoryGrouper()

    pageVisit1 = new BH.Models.Visit
      title: 'test'
      url: 'http://www.google.com/a_page'
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 4)

    pageVisit2 = new BH.Models.Visit
      title: 'another test'
      url: 'yahoo.com'
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 5)

    pageVisit3 = new BH.Models.Visit
      title: 'test again'
      url: 'aol.com'
      lastVisitTime: new Date(2011, 5, 5, 5, 6, 5)

    pageVisit4 = new BH.Models.Visit
      title: 'test again'
      url: 'http://www.google.com/another_page'
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 5)

  describe '#time', ->
    it 'stores the time in 24 hours, the date to the nearest time interval, and the page visits', ->
      visits = new BH.Collections.Visits([pageVisit1, pageVisit2])
      timeVisits = historyGrouper.time(visits.toJSON(), 15)
      expect(timeVisits[0]).toEqual
        datetime: new Date(2011, 5, 5, 3, 0, 0),
        id: '3:00',
        pageVisits: visits.toJSON()

    it 'groups history items by 15 minute increments when passed 15', ->
      visits = new BH.Collections.Visits([pageVisit1, pageVisit2])
      timeVisits = historyGrouper.time(visits.toJSON(), 15)
      expect(timeVisits.length).toEqual(1)

    it 'separates history items that are more than 15 minutes apart when passed 15', ->
      visits = new BH.Collections.Visits([pageVisit1, pageVisit3])
      timeVisits = historyGrouper.time(visits.toJSON(), 15)
      expect(timeVisits.length).toEqual(2)

  describe '#domain', ->
    it 'groups neighboring history items from the same domain', ->
      visits = new BH.Collections.Visits([pageVisit1, pageVisit4])
      visits = historyGrouper.domain(visits)
      expect(visits.length).toEqual(1)
