describe "BH.Lib.ContextMenus.PageContextMenu", ->
  pageContextMenu = domain = urlBuilder = chromeAPI = null

  beforeEach ->
    domain = "code.google.com"
    chromeAPI = loadChromeAPI domain: domain
    urlBuilder = new BH.Helpers.UrlBuilder()
    urlBuilder.build = jasmine.createSpy('build').andCallFake (key) ->
      "#{key} url"

    pageContextMenu = new BH.Lib.ContextMenus.PageContextMenu(chromeAPI, urlBuilder)

  describe "#create", ->
    it "creates a page context menu", ->
      pageContextMenu.create()
      expect(chromeAPI.contextMenus.create).toHaveBeenCalledWith
        title: "Visits to domain"
        contexts: [ "page" ]
        onclick: jasmine.any(Function)

    it "stores the menu", ->
      pageContextMenu.create()
      expect(pageContextMenu.menu).toBeDefined()

  describe "#onClick", ->
    it "builds an absolute search url", ->
      pageContextMenu.onClick pageUrl: "http://" + domain + "/projects"
      expect(urlBuilder.build).toHaveBeenCalledWith('search', [domain], {absolute: true})

    it "opens a tab to search by the domain", ->
      pageContextMenu.onClick pageUrl: "http://" + domain + "/projects"
      expect(chromeAPI.tabs.create).toHaveBeenCalledWith url: "search url"

  describe "#updateTitleDomain", ->
    it "updates the title domain from the passed tab", ->
      pageContextMenu.updateTitleDomain url: "http://" + domain + "/projects"
      expect(chromeAPI.contextMenus.update).toHaveBeenCalledWith pageContextMenu.menu,
        title: "Visits to domain"

  describe "#listenToTabs", ->
    it "reacts to selection change when the context menu exisits", ->
      pageContextMenu.create()
      pageContextMenu.listenToTabs()
      chromeAPI.tabs.onSelectionChanged.addListener.mostRecentCall.args[0]()
      expect(chromeAPI.contextMenus.update).toHaveBeenCalled()

    it "does not react to selection change when the context menu does not exist", ->
      pageContextMenu.listenToTabs()
      chromeAPI.tabs.onSelectionChanged.addListener.mostRecentCall.args[0]()
      expect(chromeAPI.contextMenus.update).not.toHaveBeenCalled()

    it "reacts to tab updates when the context menu exists", ->
      pageContextMenu.create()
      pageContextMenu.listenToTabs()
      chromeAPI.tabs.onUpdated.addListener.mostRecentCall.args[0] true, true,
        selected: true
        url: "http://" + domain + "/projects"

      expect(chromeAPI.contextMenus.update).toHaveBeenCalled()

    it "does not react to tab updates when the context menu does not exists", ->
      pageContextMenu.listenToTabs()
      chromeAPI.tabs.onUpdated.addListener.mostRecentCall.args[0]()
      expect(chromeAPI.contextMenus.update).not.toHaveBeenCalled()

  describe "#onTabUpdated", ->
    it "updates the title domain when the tab is selected", ->
      pageContextMenu.onTabUpdated
        selected: true
        url: "http://" + domain + "/projects"

      expect(chromeAPI.contextMenus.update).toHaveBeenCalled()

    it "does not update the title domain when the tab is not selected", ->
      pageContextMenu.onTabUpdated true, true,
        selected: false

      expect(chromeAPI.contextMenus.update).not.toHaveBeenCalled()

  describe "#onTabSelectionChanged", ->
    id = 1
    it "gets the tab from the passed id", ->
      pageContextMenu.onTabSelectionChanged id
      expect(chromeAPI.tabs.get).toHaveBeenCalledWith id, jasmine.any(Function)

    it "updates the title domain", ->
      pageContextMenu.onTabSelectionChanged id
      expect(chromeAPI.contextMenus.update).toHaveBeenCalled()

  describe "#remove", ->
    beforeEach ->
      pageContextMenu.create()

    it "removes the context menu", ->
      menu = pageContextMenu.menu
      pageContextMenu.remove()
      expect(chromeAPI.contextMenus.remove).toHaveBeenCalledWith menu

    it "deletes the store menu", ->
      pageContextMenu.remove()
      expect(pageContextMenu.menu).not.toBeDefined()
