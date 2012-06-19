class BH.Lib.ContextMenu.SelectionContextMenu
  constructor: (@chromeAPI, @urlBuilder) ->

  create: ->
    @menu = @chromeAPI.contextMenus.create
      title: @chromeAPI.i18n.getMessage('search_in_history')
      contexts: ['selection']
      onclick: @onClick

  onClick: (data) ->
    @chromeAPI.tabs.create
      url: @urlBuilder.build('search', [data.selectionText], {absolute: true})

  remove: ->
    @chromeAPI.contextMenus.remove(@menu)
    delete(@menu)

