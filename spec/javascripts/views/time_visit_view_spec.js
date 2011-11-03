delete(localStorage['timeVisits.December 5, 2010 10:00PM.collapsed']);

describe('TimeVisitView', function() {
  var timeVisitView, timeVisit;

  beforeEach(function() {
    insertFixtures('time_visit.html');

    var pageVisits = new PageVisits([{url: 'google.com'}, {url: 'yahoo.com'}]);

    timeVisit = new TimeVisit({
      date: 'December 5, 2010',
      time: '10:00PM',
      pageVisits: pageVisits
    });
    timeVisitView = new TimeVisitView({model: timeVisit, collection: pageVisits});
  });

  describe('#initialize', function() {
    it('defines a tag name', function() {
      expect(timeVisitView.tagName).toEqual('div');
    });

    it('defines a class name', function() {
      expect(timeVisitView.className).toEqual('time_visit_view');
    });
  });

  describe('#render', function() {
    var presenter;

    beforeEach(function() {
      insertFixtures('page_visit.html');
      presenter = timeVisit.presenter();
    });

    it('inserts the time', function() {
      timeVisitView.render();
      expect($('.time_interval .time', timeVisitView.el)).toHaveText(presenter.time);
    });

    it('inserts the amount of visits', function() {
      timeVisitView.render();
      expect($('.amount', timeVisitView.el)).toHaveText(presenter.amount);
    });

    it('inserts the visits', function() {
      timeVisitView.render();
      expect($('.visits > *', timeVisitView.el).length).toEqual(2);
    });

    it('inserts the collapsed state', function() {
      timeVisitView.render();
      expect($('.state', timeVisitView.el)).toHaveClass('');
    });
  });

  describe('#toggleState', function() {
    beforeEach(function() {
      timeVisitView.render();
    });

    it('toggles the state classes', function() {
      timeVisitView.toggleState();
      expect($('.state', timeVisitView.el)).toHaveClass('collapsed');
    });

    it('sets the model collapsed state', function() {
      timeVisitView.toggleState();
      spyOn(timeVisit, 'setCollapsed');
      timeVisitView.toggleState();
      expect(timeVisit.setCollapsed).toHaveBeenCalledWith(true);
    });
  });
});
