describe('SearchPageVisitView', function() {
  var searchedPageVisitView, pageVisit;

  beforeEach(function() {
    loadFixtures('searched_page_visit.html');
    pageVisit = new PageVisit({url: 'google.com'});
    searchedPageVisitView = new SearchedPageVisitView({model: pageVisit});
  });

  describe('#initialize', function() {
    it('defines a class name', function() {
      expect(searchedPageVisitView.className).toEqual('page_visit_view searched_page_visit_view');
    });
  });

  describe('#render', function() {
    it('inserts the title', function() {
      searchedPageVisitView.render();
      expect($('.title', searchedPageVisitView.el)).toHaveText(pageVisit.get('title'));
    });

    it('inserts the url', function() {
      searchedPageVisitView.render();
      expect($('.url', searchedPageVisitView.el)).toHaveText(pageVisit.get('url'));
    });
  });
});
