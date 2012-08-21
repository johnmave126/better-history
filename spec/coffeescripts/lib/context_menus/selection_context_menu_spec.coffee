describe "BH.Lib.ContextMenus.SelectionContextMenu", ->
  selection = selectionContextMenu = domain = urlBuilder = chromeAPI = null

  beforeEach ->

  describe "SelectionContextMenu", ->
    domain = "code.google.com"
    chromeAPI = loadChromeAPI domain: domain
    urlBuilder = new BH.Helpers.UrlBuilder()
    urlBuilder.build = jasmine.createSpy('build').andCallFake (key) ->
      "#{key} url"
    selection = "text here"

    selectionContextMenu = new BH.Lib.ContextMenus.SelectionContextMenu(chromeAPI, urlBuilder)

    describe "#create", ->
      it "creates a selection context menu", ->
        selectionContextMenu.create()
        expect(chromeAPI.contextMenus.create).toHaveBeenCalledWith
          title: "Search in history"
          contexts: [ "selection" ]
          onclick: jasmine.any(Function)

      it "stores the menu", ->
        selectionContextMenu.create()
        expect(selectionContextMenu.menu).toBeDefined()

    describe "#onClick", ->
      it "builds an absolute search url", ->
        selectionContextMenu.onClick selectionText: selection
        expect(urlBuilder.build).toHaveBeenCalledWith('search', [selection], {absolute: true})

      it "opens a tab to search by the selection", ->
        selectionContextMenu.onClick selectionText: selection
        expect(chromeAPI.tabs.create).toHaveBeenCalledWith url:'search url'

    describe "#remove", ->
      beforeEach ->
        selectionContextMenu.create()

      it "removes the context menu", ->
        menu = selectionContextMenu.menu
        selectionContextMenu.remove()
        expect(chromeAPI.contextMenus.remove).toHaveBeenCalledWith menu

      it "deletes the stored reference", ->
        selectionContextMenu.remove()
        expect(selectionContextMenu.menu).not.toBeDefined()

