class BH.Lib.ContextMenu.PageContextMenu
  constructor: (@chromeAPI, @urlBuilder) ->

  create: ->
    @menu = @chromeAPI.contextMenus.create
      title: @chromeAPI.i18n.getMessage('visits_to_domain', ['domain'])
      contexts: ['page']
      onclick: @onClick

  onClick: (data) ->
    @chromeAPI.tabs.create
      url: @urlBuilder.build('search', [@_getDomain(data.pageUrl)[1]], {absolute: true})

  updateTitleDomain: (tab) ->
    @chromeAPI.contextMenus.update @menu,
      title: @chromeAPI.i18n.getMessage('visits_to_domain', [@_getDomain(tab.url)[1]])

  listenToTabs: ->
    @chromeAPI.tabs.onSelectionChanged.addListener (tabId) =>
      @onTabSelectionChanged(tabId) if @menu

    @chromeAPI.tabs.onUpdated.addListener (tabId, changedInfo, tab) =>
      @onTabUpdated(tab) if @menu

  onTabSelectionChanged: (tabId) ->
    @chromeAPI.tabs.get tabId, (tab) =>
      @updateTitleDomain(tab)

  onTabUpdated: (tab) ->
    @updateTitleDomain(tab) if tab.selected

  remove: ->
    @chromeAPI.contextMenus.remove(@menu)
    delete(@menu)

  _getDomain: (url) ->
    url.match(/\w+:\/\/(.*?)\//)
