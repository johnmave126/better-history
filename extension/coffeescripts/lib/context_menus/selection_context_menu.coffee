class BH.Lib.ContextMenus.SelectionContextMenu
  constructor: (@chromeAPI, @urlBuilder) ->

  create: ->
    @menu = @chromeAPI.contextMenus.create
      title: @chromeAPI.i18n.getMessage('search_in_history')
      contexts: ['selection']
      onclick: (data) => @onClick(data)

  onClick: (data) ->
    urlOptions = absolute: true
    url = @urlBuilder.build('search', data.selectionText, urlOptions)

    @chromeAPI.tabs.create
      url: url

  remove: ->
    @chromeAPI.contextMenus.remove(@menu)
    delete(@menu)

