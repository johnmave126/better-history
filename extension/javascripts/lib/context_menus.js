SelectionContextMenu = function() {
  return {
    create: function() {
      this.menu = chrome.contextMenus.create({
        title: chrome.i18n.getMessage('search_in_history'),
        contexts: ['selection'],
        onclick: this.onClick
      });
    },

    onClick: function(data) {
      chrome.tabs.create({
        url: Url.search(data.selectionText)
      });
    },

    remove: function() {
      chrome.contextMenus.remove(this.menu);
      delete(this.menu);
    }
  };
};

PageContextMenu = function() {
  return {
    create: function() {
      this.menu = chrome.contextMenus.create({
        title: chrome.i18n.getMessage('visits_to_domain', ['domain']),
        contexts: ['page'],
        onclick: this.onClick
      });
    },

    onClick: function(data) {
      chrome.tabs.create({
        url: Url.search(Helpers.getDomain(data.pageUrl)[1])
      });
    },

    updateTitleDomain: function(tab) {
      chrome.contextMenus.update(this.menu, {
        title: chrome.i18n.getMessage('visits_to_domain', [Helpers.getDomain(tab.url)[1]])
      });
    },

    listenToTabs: function() {
      var self = this;
      chrome.tabs.onSelectionChanged.addListener(function(tabId) {
        if(self.menu) self.onTabSelectionChanged(tabId);
      });
      chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
        if(self.menu) self.onTabUpdated(tab);
      });
    },

    onTabSelectionChanged: function(tabId) {
      var self = this;
      chrome.tabs.get(tabId, function(tab) {
        self.updateTitleDomain(tab);
      });
    },

    onTabUpdated: function(tab) {
      if(tab.selected) this.updateTitleDomain(tab);
    },

    remove: function() {
      chrome.contextMenus.remove(this.menu);
      delete(this.menu);
    }
  };
};
