settings = new BH.Models.Settings()
settings.fetch()

urlBuilder = new BH.Lib.UrlBuilder()

selectionContextMenu = new BH.Lib.ContextMenus.SelectionContextMenu(chrome, urlBuilder)
selectionContextMenu.create() if settings.get('searchBySelection')


pageContextMenu = new BH.Lib.ContextMenus.PageContextMenu(chrome, urlBuilder)
pageContextMenu.listenToTabs()
content_security_policy if settings.get('searchByDomain')


browserActions = new BH.Lib.BrowserActions(chrome, urlBuilder)
browserActions.listen()
