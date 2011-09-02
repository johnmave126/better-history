describe('TimeVisit', function() {
  var timeVisit;

  beforeEach(function() {
    var pageVisit = new PageVisit({url: 'google.com'});
    timeVisit = new TimeVisit({time: '10:15PM', pageVisits: [pageVisit]});
  });
  describe('#presenter', function() {
    it('returns all the properties used in the view', function() {
      expect(timeVisit.presenter()).toEqual({
        time: '10:15PM',
        summary: '1 visits'
      });
    });
  });
});
