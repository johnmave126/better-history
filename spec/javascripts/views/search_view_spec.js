describe('searchView', function() {
  var searchView;

  beforeEach(function() {
    loadChromeAPI();
    loadFixtures('search.html', 'page_visit.html', 'filter.html'); 

    BH.models.settings = new Settings();
    filter = new Filter({
      title: 'Today', 
      startTime: new Date('December 1, 2010'),
      hash: 'search',
      history: new PageVisits([
        {title: 'page', url: 'http://google.com'},
        {title: 'another', url: 'http://bing.con'}
      ])
    });

    spyOn(Helpers, 'pageTitle');
    spyOn(filter, 'on');

    searchView = new SearchView({
      model: filter
    });
  });

  it('sets a class name', function() {
    expect(searchView.className).toEqual('search_view');
  });

  it('sets the template id', function() {
    expect(searchView.templateId).toEqual('search');
  });

  it('sets the page title', function() {
    expect(Helpers.pageTitle).toHaveBeenCalledWith(filter.get('title'));
  });

  it('binds on change to the model', function() {
    expect(filter.on).toHaveBeenCalledWith('change', searchView.renderPageVisits, searchView);
  });

  describe('#render', function() {
    it('inserts the rendered html into the view', function() {
      searchView.render();
      expect(searchView.$el).not.toBeEmpty();
    });

    it('returns the instance', function() {
      expect(searchView.render()).toEqual(searchView);
    });
  });

  describe('#renderPageVisits', function() {
    beforeEach(function() {
      searchView.render();
    });

    it('inserts html into the content container', function() {
      searchView.renderPageVisits();
      expect($('.content', searchView.$el)).not.toBeEmpty();
    });

    it('inserts the no visits message when there are not page visits', function() {
      filter.get('history').reset();
      searchView.renderPageVisits();
      expect($('.content .no_visits', searchView.$el)).toExist();
    });

    it('inserts the results when page visits were found', function() {
      searchView.renderPageVisits();
      expect($('.content', searchView.$el).children().length).toEqual(2);
    });

    it('writes the tab indices for all links in the content area', function() {
      spyOn(Helpers, 'tabIndex');
      searchView.renderPageVisits();
      expect(Helpers.tabIndex).toHaveBeenCalledWith(jasmine.any(Object));
    });
  });
});
