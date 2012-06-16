(function() {

  describe('BH.Lib.HistoryGrouper', function() {
    var historyGrouper, pageVisit1, pageVisit2, pageVisit3, pageVisit4;
    historyGrouper = pageVisit1 = pageVisit2 = pageVisit3 = pageVisit4 = null;
    beforeEach(function() {
      historyGrouper = new BH.Lib.HistoryGrouper();
      pageVisit1 = new BH.Models.Visit({
        title: 'test',
        url: 'http://www.google.com/a_page',
        lastVisitTime: new Date(2011, 5, 5, 3, 6, 4)
      });
      pageVisit2 = new BH.Models.Visit({
        title: 'another test',
        url: 'yahoo.com',
        lastVisitTime: new Date(2011, 5, 5, 3, 6, 5)
      });
      pageVisit3 = new BH.Models.Visit({
        title: 'test again',
        url: 'aol.com',
        lastVisitTime: new Date(2011, 5, 5, 5, 6, 5)
      });
      return pageVisit4 = new BH.Models.Visit({
        title: 'test again',
        url: 'http://www.google.com/another_page',
        lastVisitTime: new Date(2011, 5, 5, 3, 6, 5)
      });
    });
    describe('#time', function() {
      it('stores the time in 24 hours, the date to the nearest time interval, and the page visits', function() {
        var timeVisits, visits;
        visits = new BH.Collections.Visits([pageVisit1, pageVisit2]);
        timeVisits = historyGrouper.time(visits.toJSON(), 15);
        return expect(timeVisits[0]).toEqual({
          datetime: new Date(2011, 5, 5, 3, 0, 0),
          id: '3:00',
          pageVisits: visits.toJSON()
        });
      });
      it('groups history items by 15 minute increments when passed 15', function() {
        var timeVisits, visits;
        visits = new BH.Collections.Visits([pageVisit1, pageVisit2]);
        timeVisits = historyGrouper.time(visits.toJSON(), 15);
        return expect(timeVisits.length).toEqual(1);
      });
      return it('separates history items that are more than 15 minutes apart when passed 15', function() {
        var timeVisits, visits;
        visits = new BH.Collections.Visits([pageVisit1, pageVisit3]);
        timeVisits = historyGrouper.time(visits.toJSON(), 15);
        return expect(timeVisits.length).toEqual(2);
      });
    });
    return describe('#domain', function() {
      return it('groups neighboring history items from the same domain', function() {
        var visits;
        visits = new BH.Collections.Visits([pageVisit1, pageVisit4]);
        visits = historyGrouper.domain(visits);
        return expect(visits.length).toEqual(1);
      });
    });
  });

}).call(this);
