describe 'DomainGrouper', ->
  domainGrouper = visit1 = visit2 = visit3 = visit4 = null

  beforeEach ->
    domainGrouper = new DomainGrouper()

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

  describe '#domain', ->
    it 'groups neighboring history items from the same domain', ->
      visits = new BH.Collections.Visits([visit1, visit4])
      visits = domainGrouper.run(visits)
      expect(visits.length).toEqual(1)
