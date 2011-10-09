delete(localStorage['timeVisits.December 5, 2010 10:15PM.collapsed']);

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
        state: ''
      });
    });
  });

  describe('#key', function() {
    it('returns joined date and time', function() {
      expect(timeVisit.key()).toEqual('timeVisits.' + timeVisit.get('date') + ' ' + timeVisit.get('time'));
    });
  });

  describe('#collapsedKey', function() {
    it('returns the collapsed key', function() {
      expect(timeVisit.collapsedKey()).toEqual(timeVisit.key() + '.collapsed');
    });
  });

  describe('#setCollapsed', function() {
    it('updates the localStorage value when true', function() {
      timeVisit.setCollapsed(true);
      expect(localStorage[timeVisit.collapsedKey()]).toEqual('true');
    });

    it('deletes the localStorage value when false', function() {
      timeVisit.setCollapsed(false);
      expect(localStorage[timeVisit.collapsedKey()]).toBeUndefined();
    });

    it('updates the collapsed value', function() {
      timeVisit.setCollapsed(false);
      expect(timeVisit.get('collapsed')).toEqual(false);
    });
  });
});
