delete(localStorage['December 5, 2010 10:15PM.state']);

describe('TimeVisit', function() {
  var timeVisit;

  beforeEach(function() {
    var pageVisit = new PageVisit({url: 'google.com'});
    timeVisit = new TimeVisit({date: 'December 5, 2010', time: '10:15PM', pageVisits: [pageVisit]});
  });

  describe('#presenter', function() {
    it('returns all the properties used in the view', function() {
      expect(timeVisit.presenter()).toEqual({
        time: '10:15PM',
        amount: 1,
        state: 'expanded'
      });
    });
  });

  describe('#key', function() {
    it('returns joined date and time', function() {
      expect(timeVisit.key()).toEqual(timeVisit.get('date') + ' ' + timeVisit.get('time'));
    });
  });

  describe('#collapsedKey', function() {
    it('returns the collapsed key', function() {
      expect(timeVisit.stateKey()).toEqual('timeVisits.' + timeVisit.key() + '.state');
    });
  });

  describe('#setState', function() {
    it('updates the localStorage value', function() {
      timeVisit.setState('collapsed');
      expect(localStorage[timeVisit.stateKey()]).toEqual('collapsed');
    });

    it('updates the state value', function() {
      timeVisit.setState('expanded');
      expect(timeVisit.get('state')).toEqual('expanded');
    });
  });
});
