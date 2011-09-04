describe('PageVisitView', function() {
  var pageVisitView, pageVisit;

  beforeEach(function() {
    loadFixtures('page_visit.html');
    pageVisit = new PageVisit({
      url: 'google.com',
      lastVisitTime: new Date()
    });
    pageVisitView = new PageVisitView({model: pageVisit});
  });

  describe('#initialize', function() {
    it('defines a class name', function() {
      expect(pageVisitView.className).toEqual('page_visit_view');
    });
  });

  describe('#render', function() {
    var presenter;

    beforeEach(function() {
      presenter = pageVisit.presenter();
    });

    it('inserts the title', function() {
      pageVisitView.render();
      expect($('.title', pageVisitView.el)).toHaveText(presenter.title);
    });

    it('inserts the url', function() {
      pageVisitView.render();
      expect($('.url', pageVisitView.el)).toHaveText(presenter.url);
    });

    it('inserts the visited time', function() {
      pageVisitView.render();
      expect($('.time', pageVisitView.el)).toHaveText(presenter.time);
    });
  });
});
