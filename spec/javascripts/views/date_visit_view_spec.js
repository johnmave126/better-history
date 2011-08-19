describe('DateVisitView', function() {
  var dateVisitView;

  beforeEach(function() {
    loadFixtures('date_visit_view.html');
    var dateVisit = new DateVisit({date: new Date(), timeVisits: new TimeVisits()});
    dateVisitView = new DateVisitView({model: dateVisit});
  });

  describe('#initialize', function() {
    it('defines a tag name', function() {
      expect(dateVisitView.tagName).toEqual('div');
    });

    it('defines a class name', function() {
      expect(dateVisitView.className).toEqual('date_visit_view');
    });
  });

  describe('#render', function() {
    it('populates the view container', function() {
      dateVisitView.render();
      expect($(dateVisitView.el)).not.toBeEmpty();
    });
  });
});
