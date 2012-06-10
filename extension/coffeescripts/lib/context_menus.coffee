class BH.Lib.SelectionContextMenu
  create: ->
    @menu = chrome.contextMenus.create
      title: chrome.i18n.getMessage('search_in_history')
      contexts: ['selection']
      onclick: @onClick

  onClick: (data) ->
    chrome.tabs.create
      url: "#{BH.Lib.Url.base()}#{BH.Lib.Url.search(data.selectionText)}"

  remove: ->
    chrome.contextMenus.remove(@menu)
    delete(@menu)

class BH.Lib.PageContextMenu
  create: ->
    @menu = chrome.contextMenus.create
      title: chrome.i18n.getMessage('visits_to_domain', ['domain'])
      contexts: ['page']
      onclick: @onClick

  onClick: (data) ->
    chrome.tabs.create
      url: "#{BH.Lib.Url.base()}#{BH.Lib.Url.search(Helpers.getDomain(data.pageUrl)[1])}"

  updateTitleDomain: (tab) ->
    chrome.contextMenus.update @menu,
      title: chrome.i18n.getMessage('visits_to_domain', [Helpers.getDomain(tab.url)[1]])

  listenToTabs: ->
    chrome.tabs.onSelectionChanged.addListener (tabId) =>
      @onTabSelectionChanged(tabId) if @menu

    chrome.tabs.onUpdated.addListener (tabId, changedInfo, tab) =>
      @onTabUpdated(tab) if @menu

  onTabSelectionChanged: (tabId) ->
    chrome.tabs.get tabId, (tab) =>
      @updateTitleDomain(tab)

  onTabUpdated: (tab) ->
    @updateTitleDomain(tab) if tab.selected

  remove: ->
    chrome.contextMenus.remove(@menu)
    delete(@menu)
