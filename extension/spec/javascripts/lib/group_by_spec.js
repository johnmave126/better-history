describe('groupResults', function() {
  var visit1, visit2, visit3, visit4;

  beforeEach(function() {
    visit1 = new Visit({
      title: 'test',
      url: 'http://www.google.com/a_page',
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 4)
    });
    visit2 = new Visit({
      title: 'another test',
      url: 'yahoo.com',
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 5)
    });
    visit3 = new Visit({
      title: 'test again',
      url: 'aol.com',
      lastVisitTime: new Date(2011, 5, 6, 5, 6, 5)
    });
    visit4 = new Visit({
      title: 'test again',
      url: 'http://www.google.com/another_page',
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 5)
    });
  });


  it('groups history items by 15 minute increments', function() {
    var dateVisits = groupResults([visit1, visit2]);
    expect(dateVisits.at(0).get('timeVisits').at(0).get('visits')).toEqual([visit1, visit2]);
  });

  it('separates history items that are more than 15 minutes apart', function() {
    var dateVisits = groupResults([visit1, visit3]);
    expect(dateVisits.at(0)).toBeDefined();
    expect(dateVisits.at(1)).toBeDefined();
  });

  it('groups neighboring history items from the same domain', function() {
    var dateVisits = groupResults([visit1, visit4]);
    var visits = dateVisits.at(0).get('timeVisits').at(0).get('visits');
    expect(visits[0].models).toEqual([visit1, visit4]);
  });
});
