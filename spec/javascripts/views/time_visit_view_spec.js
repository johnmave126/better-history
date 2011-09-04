describe('TimeVisitView', function() {
  var timeVisitView, timeVisit;

  beforeEach(function() {
    loadFixtures('time_visit.html', 'page_visit.html');
    timeVisit = new TimeVisit({time: '10:00PM', pageVisits: [new PageVisit({url: 'google.com'})]});
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
      expect($('.time', timeVisitView.el)).toHaveText(presenter.time);
    });

    it('inserts the visit summary', function() {
      timeVisitView.render();
      expect($('.summary', timeVisitView.el)).toHaveText(presenter.summary);
    });
  });

  describe('#toggleVisits', function() {
    var ev;

    beforeEach(function() {
      timeVisitView.render();
      console.log($('.time_interval', timeVisitView.el));
      ev = {currentTarget: $('.time_interval', timeVisitView.el)};
    });

    it("hides visits when visible", function() {
      timeVisitView.toggleVisits(ev);
      expect($('.visits', timeVisitView.el)).toBeHidden();
    });

    it("shows visits when hidden", function() {
      timeVisitView.toggleVisits(ev);
      timeVisitView.toggleVisits(ev);
      expect($('.visits', timeVisitView.el)).toBeVisible();
    });
  });
});
