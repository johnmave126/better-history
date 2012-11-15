BH.Modules.topLevelSupport =
  select: ->
    $('.mainview > *').removeClass('selected')
    $('.mainview > *').css(display: 'block')

    setTimeout =>
      @$el.addClass('selected')
      $('.mainview > *:not(.selected)').css(display: 'none')
    , 0

    if @pageTitle
      element = $('<div/>')
      cleanTitle = $(element).html(@pageTitle()).text()
      document.title = "#{cleanTitle} - Better History"

    @trigger('selected')
    @
