describe('groupResults', function() {
  var historyItem1, historyItem2, historyItem3, historyItem4;

  beforeEach(function() {
    historyItem1 = new HistoryItem({
      title: 'test',
      url: 'http://www.google.com/a_page',
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 4)
    });
    historyItem2 = new HistoryItem({
      title: 'another test',
      url: 'yahoo.com',
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 5)
    });
    historyItem3 = new HistoryItem({
      title: 'test again',
      url: 'aol.com',
      lastVisitTime: new Date(2011, 5, 6, 5, 6, 5)
    });
    historyItem4 = new HistoryItem({
      title: 'test again',
      url: 'http://www.google.com/another_page',
      lastVisitTime: new Date(2011, 5, 5, 3, 6, 5)
    });
  });

  it('groups history items by 15 minute increments', function() {
    var results = groupResults([historyItem1, historyItem2]);
    var grouped = results['Sunday, June 05, 2011']['3:00 AM'];
    expect(grouped).toEqual([historyItem1, historyItem2]);
  });

  it('separates history items that are more than 15 minutes apart', function() {
    var results = groupResults([historyItem1, historyItem3]);
    expect(results['Sunday, June 05, 2011']).toBeTruthy();
    expect(results['Monday, June 06, 2011']).toBeTruthy();
  });

  it('groups neighboring history items from the same domain', function() {
    var results = groupResults([historyItem1, historyItem4]);
    var grouped = results['Sunday, June 05, 2011']['3:00 AM'];
    expect(grouped[0]).toEqual([historyItem1, historyItem4]);
    console.log(results);
  });
});
