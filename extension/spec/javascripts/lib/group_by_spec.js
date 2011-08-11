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
    var results = groupResults([visit1, visit2]);
    var grouped = results['Sunday, June 05, 2011']['3:00 AM'];
    expect(grouped).toEqual([visit1, visit2]);
  });

  it('separates history items that are more than 15 minutes apart', function() {
    var results = groupResults([visit1, visit3]);
    expect(results['Sunday, June 05, 2011']).toBeTruthy();
    expect(results['Monday, June 06, 2011']).toBeTruthy();
  });

  it('groups neighboring history items from the same domain', function() {
    var results = groupResults([visit1, visit4]);
    var grouped = results['Sunday, June 05, 2011']['3:00 AM'];
    expect(grouped[0]).toEqual([visit1, visit4]);
  });
});
