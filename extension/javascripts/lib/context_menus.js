(function() {

  BH.Lib.SelectionContextMenu = (function() {

    function SelectionContextMenu(chromeAPI, urlBuilder) {
      this.chromeAPI = chromeAPI;
      this.urlBuilder = urlBuilder;
    }

    SelectionContextMenu.prototype.create = function() {
      return this.menu = this.chromeAPI.contextMenus.create({
        title: this.chromeAPI.i18n.getMessage('search_in_history'),
        contexts: ['selection'],
        onclick: this.onClick
      });
    };

    SelectionContextMenu.prototype.onClick = function(data) {
      return this.chromeAPI.tabs.create({
        url: this.urlBuilder.build('search', [data.selectionText], {
          absolute: true
        })
      });
    };

    SelectionContextMenu.prototype.remove = function() {
      this.chromeAPI.contextMenus.remove(this.menu);
      return delete this.menu;
    };

    return SelectionContextMenu;

  })();

  BH.Lib.PageContextMenu = (function() {

    function PageContextMenu(chromeAPI, urlBuilder) {
      this.chromeAPI = chromeAPI;
      this.urlBuilder = urlBuilder;
    }

    PageContextMenu.prototype.create = function() {
      return this.menu = this.chromeAPI.contextMenus.create({
        title: this.chromeAPI.i18n.getMessage('visits_to_domain', ['domain']),
        contexts: ['page'],
        onclick: this.onClick
      });
    };

    PageContextMenu.prototype.onClick = function(data) {
      return this.chromeAPI.tabs.create({
        url: this.urlBuilder.build('search', [Helpers.getDomain(data.pageUrl)[1]], {
          absolute: true
        })
      });
    };

    PageContextMenu.prototype.updateTitleDomain = function(tab) {
      return this.chromeAPI.contextMenus.update(this.menu, {
        title: this.chromeAPI.i18n.getMessage('visits_to_domain', [Helpers.getDomain(tab.url)[1]])
      });
    };

    PageContextMenu.prototype.listenToTabs = function() {
      var _this = this;
      this.chromeAPI.tabs.onSelectionChanged.addListener(function(tabId) {
        if (_this.menu) {
          return _this.onTabSelectionChanged(tabId);
        }
      });
      return this.chromeAPI.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
        if (_this.menu) {
          return _this.onTabUpdated(tab);
        }
      });
    };

    PageContextMenu.prototype.onTabSelectionChanged = function(tabId) {
      var _this = this;
      return this.chromeAPI.tabs.get(tabId, function(tab) {
        return _this.updateTitleDomain(tab);
      });
    };

    PageContextMenu.prototype.onTabUpdated = function(tab) {
      if (tab.selected) {
        return this.updateTitleDomain(tab);
      }
    };

    PageContextMenu.prototype.remove = function() {
      this.chromeAPI.contextMenus.remove(this.menu);
      return delete this.menu;
    };

    return PageContextMenu;

  })();

}).call(this);
