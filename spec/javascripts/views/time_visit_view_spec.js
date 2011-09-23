delete(localStorage['December 5, 2010 10:00PM.state']);
describe('TimeVisitView', function() {
  var timeVisitView, timeVisit;

  beforeEach(function() {
    loadFixtures('time_visit.html', 'page_visit.html', 'grouped_visits.html');

    var pageVisit = new PageVisit({url: 'google.com'}),
        groupedVisits = new GroupedVisits([new PageVisit({url: 'yahoo.com'})]);

    timeVisit = new TimeVisit({
      date: 'December 5, 2010',
      time: '10:00PM',
      pageVisits: [pageVisit, groupedVisits]
    });
    timeVisitView = new TimeVisitView({model: timeVisit});
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
      presenter = timeVisit.presenter();
    });

    it('inserts the time', function() {
      timeVisitView.render();
      expect($('.time_interval .time', timeVisitView.el)).toHaveText(presenter.time);
    });

    it('inserts the visit summary', function() {
      timeVisitView.render();
      expect($('.summary', timeVisitView.el)).toHaveText(presenter.summary);
    });

    it('inserts the visits', function() {
      timeVisitView.render();
      expect($('.visits > *', timeVisitView.el).length).toEqual(2);
    });

    it('inserts the state', function() {
      timeVisitView.render();
      expect($('.state', timeVisitView.el)).toHaveClass('expanded');
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

    it('sets the model state', function() {
      spyOn(timeVisit, 'setState');
      timeVisitView.toggleState();
      expect(timeVisit.setState).toHaveBeenCalledWith('expanded');
    });
  });
});
