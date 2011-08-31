describe('SidebarView', function() {
  var sidebarView;

  beforeEach(function() {
    loadFixtures('sidebar.html');
    router = {bind: jasmine.createSpy('bind')};

    filters = new Filters([
      new Filter({
        name: 'Today',
        hash: 'today',
        title: 'Today',
        startTime: DateRanger.today().start.getTime(),
        endTime: DateRanger.today().end.getTime()
      }),
      new Filter({
        name: 'Yesterday',
        hash: 'yesterday',
        title: 'Yesterday',
        startTime: DateRanger.yesterday().start.getTime(),
        endTime: DateRanger.yesterday().end.getTime()
      }),
      new Filter({
        name: 'Day before',
        hash: 'dayBefore',
        title: 'Day before yesterday',
        startTime: DateRanger.dayBefore().start.getTime(),
        endTime: DateRanger.dayBefore().end.getTime()
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
      expect($('.filter a', sidebarView.el).length).toEqual(3);
    });
  });

  describe('#loadFromType', function() {
    beforeEach(function() {
      sidebarView.render();
    });

    it('calls selectFilter with the filter element based on the passed type', function() {
      spyOn(sidebarView, 'selectFilter');
      sidebarView.loadFromType('today');
      expect(sidebarView.selectFilter).toHaveBeenCalledWith($('a[data-cid=' + filters.at(0).cid + ']'));
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
    it('calls selectFilter with the clicked element', function() {
      var event = {currentTarget: 'element'};
      spyOn(sidebarView, 'selectFilter');
      sidebarView.filterClicked(event);
      expect(sidebarView.selectFilter).toHaveBeenCalledWith(event.currentTarget);
    });
  });

  describe('#selectFilter', function() {
    var filter1, filter2;

    beforeEach(function() {
      sidebarView.render();
      filter1 = $(sidebarView.el).find('.filter a')[0];
      filter2 = $(sidebarView.el).find('.filter a')[1];
      sidebarView.selectFilter(filter1);
    });

    it('adds the selected class to the parent of the passed element', function() {
      sidebarView.selectFilter(filter2);
      expect($(filter2).parent()).toHaveClass(sidebarView.selectedClass);
    });

    it('removes the selected class from filters not selected', function() {
      sidebarView.selectFilter(filter2);
      expect($(filter1).parent()).not.toHaveClass(sidebarView.selectedClass);
    });
  });

  describe('#searchTyped', function() {
    beforeEach(function() {
      sidebarView.render();
      router = {search: jasmine.createSpy('search')};
    });

    it('calls to selectFilter when the enter key is pressed', function() {
      spyOn(sidebarView, 'selectFilter');
      sidebarView.searchTyped({keyCode: 13});
      expect(sidebarView.selectFilter).toHaveBeenCalledWith(null);
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
