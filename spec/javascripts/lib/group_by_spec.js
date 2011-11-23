describe('GroupBy', function() {
  var pageVisit1, pageVisit2, pageVisit3, pageVisit4;

  beforeEach(function() {
    pageVisit1 = new PageVisit({
      title: 'test',
      url: 'http://www.google.com/a_page',
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 4)
    });
    pageVisit2 = new PageVisit({
      title: 'another test',
      url: 'yahoo.com',
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 5)
    });
    pageVisit3 = new PageVisit({
      title: 'test again',
      url: 'aol.com',
      lastVisitTime: new Date(2011, 5, 5, 5, 6, 5)
    });
    pageVisit4 = new PageVisit({
      title: 'test again',
      url: 'http://www.google.com/another_page',
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 5)
    });
  });

  describe('.time', function() {
    beforeEach(function() {
      settings = new Settings();
    });

    it('stores the time in 24 hours, the date and the page visits', function() {
      var pageVisitsJSON = new PageVisits([pageVisit1, pageVisit2]).toJSON();
      var timeVisits = GroupBy.time(pageVisitsJSON);
      expect(timeVisits[0]).toEqual({
        datetime: new Date(2011, 5, 5, 3, 6, 4),
        id: '3:00',
        pageVisits: pageVisitsJSON
      });
    });

    it('groups history items by 15 minute increments when passed 15', function() {
      var timeVisits = GroupBy.time(new PageVisits([pageVisit1, pageVisit2]).toJSON());
      expect(timeVisits.length).toEqual(1);
    });

    it('separates history items that are more than 15 minutes apart when passed 15', function() {
      var timeVisits = GroupBy.time(new PageVisits([pageVisit1, pageVisit3]).toJSON());
      expect(timeVisits.length).toEqual(2);
    });
  });

  describe('.domain', function() {
    it('groups neighboring history items from the same domain', function() {
      var pageVisits = GroupBy.domain(new PageVisits([pageVisit1, pageVisit4]));
      expect(pageVisits.length).toEqual(1);
    });
  });
});
