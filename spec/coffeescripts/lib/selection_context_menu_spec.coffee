describe "BH.Lib.ContextMenus.SelectionContextMenu", ->
  beforeEach ->
    @chromeAPI = loadChromeAPI domain: 'code.google.com'
    @selectionContextMenu = new BH.Lib.ContextMenus.SelectionContextMenu(chromeAPI)

    describe "#create", ->
      it "creates a selection context menu", ->
        @selectionContextMenu.create()
        expect(@chromeAPI.contextMenus.create).toHaveBeenCalledWith
          title: "Search in history"
          contexts: [ "selection" ]
          onclick: jasmine.any(Function)

      it "stores the menu", ->
        @selectionContextMenu.create()
        expect(@selectionContextMenu.menu).toBeDefined()

    describe "#onClick", ->
      it "opens a tab to search by the selection", ->
        @selectionContextMenu.onClick selectionText: 'text here'
        expect(@chromeAPI.tabs.create).toHaveBeenCalledWith url:'chrome://history/#search/text here'

    describe "#remove", ->
      beforeEach ->
        @selectionContextMenu.create()

      it "removes the context menu", ->
        menu = @selectionContextMenu.menu
        @selectionContextMenu.remove()
        expect(@chromeAPI.contextMenus.remove).toHaveBeenCalledWith menu

      it "deletes the stored reference", ->
        @selectionContextMenu.remove()
        expect(@selectionContextMenu.menu).not.toBeDefined()

