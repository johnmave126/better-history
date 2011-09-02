describe('TimeVisitView', function() {
  var timeVisitView;

  beforeEach(function() {
    loadFixtures('time_visit.html', 'page_visit.html');
    var timeVisit = new TimeVisit({pageVisits: [new PageVisit({url: 'google.com'})]});
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
