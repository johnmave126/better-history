class BH.Views.Modal extends BH.Views.BaseView
  pulseClass: 'pulse'

  generalEvents:
    'click .close-button': 'close'
    'click .overlay': 'pulse'

  attachGeneralEvents: ->
    _.extend(@events, @generalEvents)

  renderTemplate: (json) ->
    overlay = $(BH.Templates['modal'])
    $('.page', overlay).append(Mustache.to_html(@template, json))
    overlay

  open: ->
    $('body').append(@render().el)
    @_globalBinds()
    $(window).trigger('resize')

  pulse: ->
    @$('.page').addClass('pulse')

  close: ->
    @trigger('close')
    @remove()
    @_globalUnbinds()

  _globalBinds: ->
    $(window).resize(@_updateHeight)
    $(window).keydown($.proxy(@_closeOnEscape, @))

  _globalUnbinds: ->
    $(window).unbind('resize')
    $(document).unbind('keydown')

  _updateHeight: ->
    @$('.page').css
      maxHeight: Math.min(0.9 * window.innerHeight, 640)

  _closeOnEscape: (e) ->
    if e.keyCode == 27
      @close()
