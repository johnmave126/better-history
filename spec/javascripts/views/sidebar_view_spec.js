describe('SidebarView', function() {
  var sidebarView, filters;

  beforeEach(function() {
    loadChromeAPI();
    loadFixtures('sidebar.html', 'filter_item.html'); 
    BH.router = {
      on: jasmine.createSpy('on'),
      navigate: jasmine.createSpy('navigate')
    };

    filters = DefaultFilters.fetch();
    sidebarView = new SidebarView({
      collection: filters 
    });
  });

  it('sets a class name', function() {
    expect(sidebarView.className).toEqual('sidebar_view');
  });

  it('sets the template id', function() {
    expect(sidebarView.templateId).toEqual('sidebar');
  });

  it('sets the selected class', function() {
    expect(sidebarView.selectedClass).toEqual('selected');
  });

  describe('#initialize', function() {
    it('binds on router filter', function() {
      expect(BH.router.on).toHaveBeenCalledWith('route:filter', jasmine.any(Function));
    });

    it('binds on router settings', function() {
      expect(BH.router.on).toHaveBeenCalledWith('route:settings', jasmine.any(Function));
    });
  });

  describe('#render', function() {
    it('inserts the rendered html into the view', function() {
      sidebarView.render();
      expect(sidebarView.$el).not.toBeEmpty();
    });

    it('inserts the rendered filter items into the filters container', function() {
      sidebarView.render();
      expect($('.filters', sidebarView.$el)).not.toBeEmpty();
    });

    it('returns the instance', function() {
      expect(sidebarView.render()).toEqual(sidebarView);
    });

    it('fetches the number of visits for filters', function() {
      spyOn(filters, 'fetchCounts');
      sidebarView.render()
      expect(filters.fetchCounts).toHaveBeenCalled();
    });

    it('scrolls to the top', function() {
      sidebarView.render();
      expect($(document).scrollTop()).toEqual(0);
    });

    xit('focuses on the sidebar search box', function() {
    });
  });

  describe('#settingsRouted', function() {
    var selectedElement;

    beforeEach(function() {
      sidebarView.render();
      selectedElement = $('.settings_link', sidebarView.$el).parent(); 
    });

    it('selects the settings link', function() {
      sidebarView.settingsRouted();
      expect(selectedElement).toHaveClass(sidebarView.selectedClass);
    });

    it('only selects one element', function() {
      sidebarView.settingsRouted();
      expect($('.' + sidebarView.selectedClass, sidebarView.$el).length).toEqual(1);
    });
  });

  describe('#settingsClicked', function() {
    var ev;

    beforeEach(function() {
      sidebarView.render();
      ev = {currentTarget: $('.settings_link', sidebarView.$el)};
    });

    it('selects the settings link clicked', function() {
      sidebarView.settingsClicked(ev);
      expect(ev.currentTarget.parent()).toHaveClass(sidebarView.selectedClass);
    });
  });

  describe('#filterRouted', function() {
    var selectedElement, filter;

    beforeEach(function() {
      filter = filters.at(0);
      sidebarView.render();
      selectedElement = $('.filter_item_view:first-child', sidebarView.$el); 
    });

    it('selects the routed filter', function() {
      sidebarView.filterRouted(filter.get('hash'));
      expect(selectedElement).toHaveClass(sidebarView.selectedClass);
    });

    it('only selects one element', function() {
      sidebarView.filterRouted(filter.get('hash'));
      expect($('.' + sidebarView.selectedClass, sidebarView.$el).length).toEqual(1);
    });
  });

  describe('#filterClicked', function() {
    var ev;

    beforeEach(function() {
      sidebarView.render();
      ev = {currentTarget: $('.filter_item_view:first-child a', sidebarView.$el)};
    });

    it('selects the filter link clicked', function() {
      sidebarView.settingsClicked(ev);
      expect(ev.currentTarget.parent()).toHaveClass(sidebarView.selectedClass);
    });
  });

  describe('#searchTyped', function() {
    beforeEach(function() {
      sidebarView.render();
    });

    it('does not navigate to search when the search term is empty and enter is pressed', function() {
      $('.search', sidebarView.$el).val('');
      sidebarView.searchTyped({keyCode: 13});
      expect(BH.router.navigate).not.toHaveBeenCalled();
    });

    it('does not navigate to search when enter is not pressed', function() {
      $('.search', sidebarView.$el).val('google');
      sidebarView.searchTyped({keyCode: 14});
      expect(BH.router.navigate).not.toHaveBeenCalled();
    });

    describe('when there is a search term and enter is pressed', function() {
      it('navigates to search with the search term', function() {
        $('.search', sidebarView.$el).val('google');
        sidebarView.searchTyped({keyCode: 13});
        expect(BH.router.navigate).toHaveBeenCalledWith('search/google', true);
      });

      it('removes the selected class', function() {
        expect($('.selected', sidebarView.$el).length).toEqual(0);
      });
    });
  });
});
