describe "BH.Lib.SelectionContextMenu", ->
  beforeEach ->
    @selectionContextMenu = new BH.Lib.SelectionContextMenu()
    @chromeAPI = @selectionContextMenu.chromeAPI

  describe "#create", ->
    it "creates a selection context menu", ->
      @selectionContextMenu.create()
      expect(@chromeAPI.contextMenus.create).toHaveBeenCalledWith
        title: "[translated search_in_history]"
        contexts: [ "selection" ]
        id: 'better_history_selection_context_menu'

    it "stores the menu", ->
      @selectionContextMenu.create()
      expect(@selectionContextMenu.menu).toBeDefined()

  describe "#onClick", ->
    it "opens a tab to search by the selection", ->
      @selectionContextMenu.onClick
        menuItemId: 'better_history_selection_context_menu'
        selectionText: 'text here'
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

