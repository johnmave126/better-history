describe('SidebarView', function() {
  var sidebarView;

  beforeEach(function() {
    insertFixtures('sidebar.html');
    router = {
      bind: jasmine.createSpy('bind'),
      search: jasmine.createSpy('search')
    };
    PageVisit = {search: jasmine.createSpy('search').andCallFake(function(options, callback) {
        callback([]);
      })
    };

    filters = new Filters([
      new Filter({
        daysSinceToday: 0,
        startTime: DateRanger.borders(0).start.getTime(),
        endTime: DateRanger.borders(0).end.getTime()
      }),
      new Filter({
        daysSinceToday: 1,
        startTime: DateRanger.borders(1).start.getTime(),
        endTime: DateRanger.borders(1).end.getTime()
      })
    ]);
    sidebarView = new SidebarView({collection: filters});
  });

  describe('#initialize', function() {
    it('defines a tag name', function() {
      expect(sidebarView.tagName).toEqual('div');
    });

    it('defines a class name', function() {
      expect(sidebarView.className).toEqual('sidebar_view');
    });

    it('listens on the router', function() {
      expect(router.bind).toHaveBeenCalledWith('route:filter', jasmine.any(Function));
    });
  });

  describe('#render', function() {
    it('contains the search field', function() {
      sidebarView.render();
      expect($(sidebarView.el)).toContain('input.search');
    });

    it('contains the clear history link', function() {
      sidebarView.render();
      expect($(sidebarView.el)).toContain('a.clear_history');
    });

    it('contains links to each filter', function() {
      sidebarView.render();
      expect($('.filter a', sidebarView.el).length).toEqual(2);
    });
  });

  describe('#clearHistoryClicked', function() {
    beforeEach(function() {
      chrome = {tabs: {create: jasmine.createSpy('create')}};
      event = {preventDefault: jasmine.createSpy('preventDefault')};
    });

    it('creates a tab to clear browser history', function() {
      sidebarView.clearHistoryClicked(event);
      expect(chrome.tabs.create).toHaveBeenCalledWith({url: 'chrome://settings/clearBrowserData'});
    });

    it('prevents the default link behavior', function() {
      sidebarView.clearHistoryClicked(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('#filterClicked', function() {
    var event;

    beforeEach(function() {
      event = {currentTarget: 'element'};
      spyOn(sidebarView, 'selectFilter');
      spyOn(filters, 'getByCid').andReturn(true);
    });
    it('calls selectFilter', function() {
      sidebarView.filterClicked(event);
      expect(sidebarView.selectFilter).toHaveBeenCalled();
    });

    it('sets selectedFilter', function() {
      sidebarView.filterClicked(event);
      expect(sidebarView.selectedFilter).toBeDefined();
    });
  });

  describe('#selectFilter', function() {
    var filter1, filter2;

    beforeEach(function() {
      sidebarView.render();
      filter1 = $(sidebarView.el).find('.filter a')[0];
      filter2 = $(sidebarView.el).find('.filter a')[1];
    });

    it('adds the selected class to the selected filter', function() {
      sidebarView.selectedFilter = filters.at(1);
      sidebarView.selectFilter();
      expect($(filter2).parent()).toHaveClass(sidebarView.selectedClass);
    });

    it('removes the selected class from filters not selected', function() {
      sidebarView.selectedFilter = filters.at(0);
      sidebarView.selectFilter();
      expect($(filter2).parent()).not.toHaveClass(sidebarView.selectedClass);
    });
  });

  describe('#searchTyped', function() {
    beforeEach(function() {
      sidebarView.render();
    });

    it('calls to selectFilter when the enter key is pressed', function() {
      spyOn(sidebarView, 'selectFilter');
      sidebarView.searchTyped({keyCode: 13});
      expect(sidebarView.selectFilter).toHaveBeenCalled();
    });

    it('calls to the router with the search term', function() {
      sidebarView.searchTyped({keyCode:13});
      expect(router.search).toHaveBeenCalled();
    });

    it('does nothing when the enter key was not pressed', function() {
      sidebarView.searchTyped({keyCode:12});
      expect(router.search).not.toHaveBeenCalled();
    });
  });
});
