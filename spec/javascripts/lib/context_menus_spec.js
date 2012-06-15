(function() {

  describe("Context Menus", function() {
    var chromeAPI, domain, urlBuilder;
    domain = urlBuilder = chromeAPI = null;
    beforeEach(function() {
      domain = "code.google.com";
      chromeAPI = loadChromeAPI({
        domain: domain
      });
      urlBuilder = new BH.Helpers.UrlBuilder();
      return urlBuilder.build = jasmine.createSpy('build').andCallFake(function(key) {
        return "" + key + " url";
      });
    });
    describe("SelectionContextMenu", function() {
      var selection, selectionContextMenu;
      selectionContextMenu = void 0;
      selection = "text here";
      beforeEach(function() {
        return selectionContextMenu = new BH.Lib.SelectionContextMenu(chromeAPI, urlBuilder);
      });
      describe("#create", function() {
        it("creates a selection context menu", function() {
          selectionContextMenu.create();
          return expect(chromeAPI.contextMenus.create).toHaveBeenCalledWith({
            title: "Search in history",
            contexts: ["selection"],
            onclick: selectionContextMenu.onClick
          });
        });
        return it("stores the menu", function() {
          selectionContextMenu.create();
          return expect(selectionContextMenu.menu).toBeDefined();
        });
      });
      describe("#onClick", function() {
        it("builds an absolute search url", function() {
          selectionContextMenu.onClick({
            selectionText: selection
          });
          return expect(urlBuilder.build).toHaveBeenCalledWith('search', [selection], {
            absolute: true
          });
        });
        return it("opens a tab to search by the selection", function() {
          selectionContextMenu.onClick({
            selectionText: selection
          });
          return expect(chromeAPI.tabs.create).toHaveBeenCalledWith({
            url: 'search url'
          });
        });
      });
      return describe("#remove", function() {
        beforeEach(function() {
          return selectionContextMenu.create();
        });
        it("removes the context menu", function() {
          var menu;
          menu = selectionContextMenu.menu;
          selectionContextMenu.remove();
          return expect(chromeAPI.contextMenus.remove).toHaveBeenCalledWith(menu);
        });
        return it("deletes the stored reference", function() {
          selectionContextMenu.remove();
          return expect(selectionContextMenu.menu).not.toBeDefined();
        });
      });
    });
    return describe("PageContextMenu", function() {
      var pageContextMenu;
      pageContextMenu = null;
      beforeEach(function() {
        return pageContextMenu = new BH.Lib.PageContextMenu(chromeAPI, urlBuilder);
      });
      describe("#create", function() {
        it("creates a page context menu", function() {
          pageContextMenu.create();
          return expect(chromeAPI.contextMenus.create).toHaveBeenCalledWith({
            title: "Visits to domain",
            contexts: ["page"],
            onclick: pageContextMenu.onClick
          });
        });
        return it("stores the menu", function() {
          pageContextMenu.create();
          return expect(pageContextMenu.menu).toBeDefined();
        });
      });
      describe("#onClick", function() {
        it("builds an absolute search url", function() {
          pageContextMenu.onClick({
            pageUrl: "http://" + domain + "/projects"
          });
          return expect(urlBuilder.build).toHaveBeenCalledWith('search', [domain], {
            absolute: true
          });
        });
        return it("opens a tab to search by the domain", function() {
          pageContextMenu.onClick({
            pageUrl: "http://" + domain + "/projects"
          });
          return expect(chromeAPI.tabs.create).toHaveBeenCalledWith({
            url: "search url"
          });
        });
      });
      describe("#updateTitleDomain", function() {
        return it("updates the title domain from the passed tab", function() {
          pageContextMenu.updateTitleDomain({
            url: "http://" + domain + "/projects"
          });
          return expect(chromeAPI.contextMenus.update).toHaveBeenCalledWith(pageContextMenu.menu, {
            title: "Visits to domain"
          });
        });
      });
      describe("#listenToTabs", function() {
        it("reacts to selection change when the context menu exisits", function() {
          pageContextMenu.create();
          pageContextMenu.listenToTabs();
          chromeAPI.tabs.onSelectionChanged.addListener.mostRecentCall.args[0]();
          return expect(chromeAPI.contextMenus.update).toHaveBeenCalled();
        });
        it("does not react to selection change when the context menu does not exist", function() {
          pageContextMenu.listenToTabs();
          chromeAPI.tabs.onSelectionChanged.addListener.mostRecentCall.args[0]();
          return expect(chromeAPI.contextMenus.update).not.toHaveBeenCalled();
        });
        it("reacts to tab updates when the context menu exists", function() {
          pageContextMenu.create();
          pageContextMenu.listenToTabs();
          chromeAPI.tabs.onUpdated.addListener.mostRecentCall.args[0](true, true, {
            selected: true,
            url: "http://" + domain + "/projects"
          });
          return expect(chromeAPI.contextMenus.update).toHaveBeenCalled();
        });
        return it("does not react to tab updates when the context menu does not exists", function() {
          pageContextMenu.listenToTabs();
          chromeAPI.tabs.onUpdated.addListener.mostRecentCall.args[0]();
          return expect(chromeAPI.contextMenus.update).not.toHaveBeenCalled();
        });
      });
      describe("#onTabUpdated", function() {
        it("updates the title domain when the tab is selected", function() {
          pageContextMenu.onTabUpdated({
            selected: true,
            url: "http://" + domain + "/projects"
          });
          return expect(chromeAPI.contextMenus.update).toHaveBeenCalled();
        });
        return it("does not update the title domain when the tab is not selected", function() {
          pageContextMenu.onTabUpdated(true, true, {
            selected: false
          });
          return expect(chromeAPI.contextMenus.update).not.toHaveBeenCalled();
        });
      });
      describe("#onTabSelectionChanged", function() {
        var id;
        id = 1;
        it("gets the tab from the passed id", function() {
          pageContextMenu.onTabSelectionChanged(id);
          return expect(chromeAPI.tabs.get).toHaveBeenCalledWith(id, jasmine.any(Function));
        });
        return it("updates the title domain", function() {
          pageContextMenu.onTabSelectionChanged(id);
          return expect(chromeAPI.contextMenus.update).toHaveBeenCalled();
        });
      });
      return describe("#remove", function() {
        beforeEach(function() {
          return pageContextMenu.create();
        });
        it("removes the context menu", function() {
          var menu;
          menu = pageContextMenu.menu;
          pageContextMenu.remove();
          return expect(chromeAPI.contextMenus.remove).toHaveBeenCalledWith(menu);
        });
        return it("deletes the store menu", function() {
          pageContextMenu.remove();
          return expect(pageContextMenu.menu).not.toBeDefined();
        });
      });
    });
  });

}).call(this);
