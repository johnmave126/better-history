describe('PageVisitView', function() {
  var pageVisitView, pageVisit;

  beforeEach(function() {
    loadFixtures('page_visit.html');
    pageVisit = new PageVisit({url: 'google.com'});
    pageVisitView = new PageVisitView({model: pageVisit});
  });

  describe('#initialize', function() {
    it('defines a class name', function() {
      expect(pageVisitView.className).toEqual('page_visit_view');
    });
  });

  describe('#render', function() {
    it('inserts the title', function() {
      pageVisitView.render();
      expect($('.title', pageVisitView.el)).toHaveText(pageVisit.get('title'));
    });

    it('inserts the url', function() {
      pageVisitView.render();
      expect($('.url', pageVisitView.el)).toHaveText(pageVisit.get('url'));
    });
  });
});
