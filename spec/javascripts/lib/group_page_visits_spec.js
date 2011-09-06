describe('groupPageVisits', function() {
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
      lastVisitTime: new Date(2011, 5, 6, 5, 6, 5)
    });
    pageVisit4 = new PageVisit({
      title: 'test again',
      url: 'http://www.google.com/another_page',
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 5)
    });
  });


  it('groups history items by 15 minute increments', function() {
    var dateVisits = groupPageVisits(new PageVisits([pageVisit1, pageVisit2]));
    expect(dateVisits.at(0).get('timeVisits').at(0).get('pageVisits')).toEqual([pageVisit1, pageVisit2]);
  });

  it('separates history items that are more than 15 minutes apart', function() {
    var dateVisits = groupPageVisits(new PageVisits([pageVisit1, pageVisit3]));
    expect(dateVisits.at(0)).toBeDefined();
    expect(dateVisits.at(1)).toBeDefined();
  });

  it('groups neighboring history items from the same domain', function() {
    var dateVisits = groupPageVisits(new PageVisits([pageVisit1, pageVisit4]));
    var pageVisits = dateVisits.at(0).get('timeVisits').at(0).get('pageVisits');
    expect(pageVisits[0].models).toEqual([pageVisit1, pageVisit4]);
  });
});
