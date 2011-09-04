describe('SearchView', function() {
  var searchView, filter;

  beforeEach(function() {
    loadFixtures('search.html');
    filter = new Filter({text: 'term'});
    searchView = new SearchView({model: filter});
  });

  describe('#initialize', function() {
    it('defines a class name', function() {
      expect(searchView.className).toEqual('search_view');
    });
  });

  describe('#render', function() {
    it('inserts the search time', function() {
      searchView.render();
      expect($('.text', searchView.el)).toHaveText(filter.get('text'));
    });
  });
});
