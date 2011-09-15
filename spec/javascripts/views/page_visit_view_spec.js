describe('PageVisitView', function() {
  var pageVisitView, pageVisit;

  beforeEach(function() {
    loadFixtures('page_visit.html');
    pageVisit = new PageVisit({
      url: 'google.com',
      title: 'google',
      location: 'google.com',
      time: 'Sunday'
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
      expect($('.page_visit', pageVisitView.el)).toHaveAttr('href', presenter.url);
    });

    it('inserts the location', function() {
      pageVisitView.render();
      expect($('.location', pageVisitView.el)).toHaveText(presenter.location);
    });

    it('inserts the time', function() {
      pageVisitView.render();
      expect($('.time', pageVisitView.el)).toHaveText(presenter.time);
    });
  });
});
