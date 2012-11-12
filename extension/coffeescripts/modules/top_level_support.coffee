BH.Modules.topLevelSupport =
  cssClass:
    selected: 'selected'

  select: ->
    $('.mainview > *').removeClass(@cssClass.selected)
    $('.mainview > *').css(display: 'block')
    setTimeout =>
      @$el.addClass(@cssClass.selected)
      $('.mainview > *:not(.selected)').css(display: 'none')
    , 0
    @setPageTitle(@pageTitle()) if @pageTitle
    @

  isSelected: ->
    @$el.hasClass(@cssClass.selected)

  setPageTitle: (title) ->
    element = $('<div/>')
    document.title = $(element).html(title).text() + ' - Better History'
