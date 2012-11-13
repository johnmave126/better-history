class BH.Lib.SelectionContextMenu extends BH.Base
  @include BH.Modules.chromeSupport
  @include BH.Modules.urlSupport

  create: ->
    @menu = @chromeAPI.contextMenus.create
      title: @t('search_in_history')
      contexts: ['selection']
      onclick: (data) => @onClick(data)

  onClick: (data) ->
    urlOptions = absolute: true
    url = @urlFor('search', data.selectionText, urlOptions)

    @chromeAPI.tabs.create
      url: url

  remove: ->
    @chromeAPI.contextMenus.remove(@menu)
    delete(@menu)
