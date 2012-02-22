delete(localStorage['timeVisits.11 5, 2010 22:15.collapsed']);

describe('TimeVisit', function() {
  var timeVisit;

  beforeEach(function() {
    loadChromeAPI();
    settings = new Settings();
    var pageVisit = new PageVisit({url: 'google.com'});
    timeVisit = new TimeVisit({
      datetime: new Date('December 5, 2010 10:15 PM'),
      id: '22:15',
      pageVisits: [pageVisit]
    });
  });

  describe('#toTemplate', function() {
    it('returns all the properties used in the view', function() {
      expect(timeVisit.toTemplate()).toEqual({
        amount: '1<span class="amount"></span> visits', // TODO: fix!
        time: '10:15 evening PM',
        state: '',
        id: '22:15'
      });
    });
  });

  describe('#sync', function() {
    var callback;

    beforeEach(function() {
      callback = jasmine.createSpy('callback');
    });

    it('returns collapsed from local storage with reading', function() {
      localStorage['timeVisits.11 5, 2010 22:15.collapsed'] = true;
      timeVisit.sync('read', timeVisit, {success: callback});
      expect(callback).toHaveBeenCalledWith({
        collapsed: true
      });
    });
    it('updates the localStorage value when true', function() {
      timeVisit.setCollapsed(true);
      expect(localStorage[timeVisit.collapsedKey()]).toEqual('true');
    });

    it('deletes the localStorage value when false', function() {
      timeVisit.setCollapsed(false);
      expect(localStorage[timeVisit.collapsedKey()]).toBeUndefined();
    });
  });


  describe('#collapsedKey', function() {
    it('returns the collapsed key', function() {
      expect(timeVisit.collapsedKey()).toEqual('timeVisits.' + timeVisit.getDateId() + '.collapsed');
    });
  });

  describe('#setCollapsed', function() {
    it('updates the collapsed value', function() {
      timeVisit.setCollapsed(false);
      expect(timeVisit.get('collapsed')).toEqual(false);
    });

    it('calls to save', function() {
      spyOn(timeVisit, 'save');
      timeVisit.setCollapsed(true);
      expect(timeVisit.save).toHaveBeenCalled();
    });
  });

  describe('#getDateId', function() {
    it('returns the date with id', function() {
      expect(timeVisit.getDateId()).toEqual('11 5, 2010 22:15');
    });
  });
});
