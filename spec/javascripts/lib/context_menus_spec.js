describe('Context Menus', function() {
  var domain = 'code.google.com';

  beforeEach(function() {
    loadChromeAPI({domain: domain});
  });

  describe('SelectionContextMenu', function() {
    var selectionContextMenu, selection = 'text here';

    beforeEach(function() {
      selectionContextMenu = new SelectionContextMenu();
    });

    describe('#create', function() {
      it('creates a selection context menu', function() {
        selectionContextMenu.create();
        expect(chrome.contextMenus.create).toHaveBeenCalledWith({
          title: 'Search in history',
          contexts: ['selection'],
          onclick: selectionContextMenu.onClick
        });
      });

      it('stores the menu', function() {
        selectionContextMenu.create();
        expect(selectionContextMenu.menu).toBeDefined();
      });
    });

    describe('#onClick', function() {
      it('opens a tab to search by the selection', function() {
        selectionContextMenu.onClick({selectionText: selection});
        expect(chrome.tabs.create).toHaveBeenCalledWith({
          url: Url.search(selection)
        });
      });
    });

    describe('#remove', function() {
      beforeEach(function() {
        selectionContextMenu.create();
      });

      it('removes the context menu', function() {
        var menu = selectionContextMenu.menu;
        selectionContextMenu.remove();
        expect(chrome.contextMenus.remove).toHaveBeenCalledWith(menu);
      });

      it('deletes the stored reference', function() {
        selectionContextMenu.remove();
        expect(selectionContextMenu.menu).not.toBeDefined();
      });
    });
  });

  describe('PageContextMenu', function() {
    var pageContextMenu;

    beforeEach(function() {
      pageContextMenu = new PageContextMenu();
    });

    describe('#create', function() {
      it('creates a page context menu', function() {
        pageContextMenu.create();
        expect(chrome.contextMenus.create).toHaveBeenCalledWith({
          title: 'Visits to domain',
          contexts: ['page'],
          onclick: pageContextMenu.onClick
        });
      });

      it('stores the menu', function() {
        pageContextMenu.create();
        expect(pageContextMenu.menu).toBeDefined();
      });
    });

    describe('#onClick', function() {
      it('opens a tab to search by the domain', function() {
        pageContextMenu.onClick({pageUrl: 'http://' + domain + '/projects'});
        expect(chrome.tabs.create).toHaveBeenCalledWith({
          url: Url.search(domain)
        });
      });
    });

    describe('#updateTitleDomain', function() {
      it('updates the title domain from the passed tab', function() {
        pageContextMenu.updateTitleDomain({url: 'http://' + domain + '/projects'});
        expect(chrome.contextMenus.update).toHaveBeenCalledWith(pageContextMenu.menu, {
          title: 'Visits to ' + domain
        });
      });
    });

    describe('#listenToTabs', function() {
      it('reacts to selection change when the context menu exisits', function() {
        pageContextMenu.create();
        pageContextMenu.listenToTabs();
        chrome.tabs.onSelectionChanged.addListener.mostRecentCall.args[0]();
        expect(chrome.contextMenus.update).toHaveBeenCalled();
      });

      it('does not react to selection change when the context menu does not exist', function() {
        pageContextMenu.listenToTabs();
        chrome.tabs.onSelectionChanged.addListener.mostRecentCall.args[0]();
        expect(chrome.contextMenus.update).not.toHaveBeenCalled();
      });

      it('reacts to tab updates when the context menu exists', function() {
        pageContextMenu.create();
        pageContextMenu.listenToTabs();
        chrome.tabs.onUpdated.addListener.mostRecentCall.args[0](true, true, {selected:true, url:'http://' + domain + '/projects'});
        expect(chrome.contextMenus.update).toHaveBeenCalled();
      });

      it('does not react to tab updates when the context menu does not exists', function() {
        pageContextMenu.listenToTabs();
        chrome.tabs.onUpdated.addListener.mostRecentCall.args[0]();
        expect(chrome.contextMenus.update).not.toHaveBeenCalled();
      });
    });

    describe('#onTabUpdated', function() {
      it('updates the title domain when the tab is selected', function() {
        pageContextMenu.onTabUpdated({selected: true, url: 'http://' + domain + '/projects'});
        expect(chrome.contextMenus.update).toHaveBeenCalled();
      });

      it('does not update the title domain when the tab is not selected', function() {
        pageContextMenu.onTabUpdated(true, true, {selected: false});
        expect(chrome.contextMenus.update).not.toHaveBeenCalled();
      });
    });

    describe('#onTabSelectionChanged', function() {
      var id = 1;

      it('gets the tab from the passed id', function() {
        pageContextMenu.onTabSelectionChanged(id);
        expect(chrome.tabs.get).toHaveBeenCalledWith(id, jasmine.any(Function));
      });

      it('updates the title domain', function() {
        pageContextMenu.onTabSelectionChanged(id);
        expect(chrome.contextMenus.update).toHaveBeenCalled();
      });
    });

    describe('#remove', function() {
      beforeEach(function() {
        pageContextMenu.create();
      });

      it('removes the context menu', function() {
        var menu = pageContextMenu.menu;
        pageContextMenu.remove();
        expect(chrome.contextMenus.remove).toHaveBeenCalledWith(menu);
      });

      it('deletes the store menu', function() {
        pageContextMenu.remove();
        expect(pageContextMenu.menu).not.toBeDefined();
      });
    });
  });
});
