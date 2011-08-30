describe('SidebarView', function() {
  var sidebarView;

  beforeEach(function() {
    loadFixtures('sidebar_view.html');
    sidebarView = new SidebarView({collection:
      new Filters([
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
      ])
    });
  });

  describe('#initialize', function() {
    it('defines a tag name', function() {
      expect(sidebarView.tagName).toEqual('div');
    });

    it('defines a class name', function() {
      expect(sidebarView.className).toEqual('sidebar_view');
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

  describe('#events', function() {
    beforeEach(function() {
      sidebarView.render();
    });

    it('attachs a click on the clear history link', function() {
      spyOn(sidebarView, 'clearHistoryClicked');
      $('.clear_history', sidebarView.el).trigger('click');
      expect(sidebarView.clearHistoryClicked).toHaveBeenCalled();
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
    it('calls select with the clicked element', function() {
      var event = {currentTarget: 'element'};
      spyOn(sidebarView, 'select');
      sidebarView.filterClicked(event);
      expect(sidebarView.select).toHaveBeenCalledWith(event.currentTarget);
    });
  });

  describe('#select', function() {
    var element;

    beforeEach(function() {
      sidebarView.render();
      element = $(sidebarView.el).find('.filter a')[0];
      sidebarView.select(element);
    });

    it('adds the selected class to the parent of the passed element', function() {
      sidebarView.select(element);
      expect($(element).parent()).toHaveClass(sidebarView.selectedClass);
    });
  });

  describe('#searchTyped', function() {
    beforeEach(function() {
      sidebarView.render();
      router = {search: jasmine.createSpy('search')};
    });

    it('calls to select when the enter key is pressed', function() {
      spyOn(sidebarView, 'select');
      sidebarView.searchTyped({keyCode: 13});
      expect(sidebarView.select).toHaveBeenCalledWith(null);
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
