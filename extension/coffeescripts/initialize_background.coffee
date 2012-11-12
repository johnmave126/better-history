settings = new BH.Models.Settings()
settings.fetch()

window.selectionContextMenu = new BH.Lib.ContextMenus.SelectionContextMenu(chrome)

if settings.get('searchBySelection')
  selectionContextMenu.create()

window.pageContextMenu = new BH.Lib.ContextMenus.PageContextMenu(chrome)
pageContextMenu.listenToTabs()

if settings.get('searchByDomain')
  pageContextMenu.create()

browserActions = new BH.Lib.BrowserActions(chrome)
browserActions.listen()
