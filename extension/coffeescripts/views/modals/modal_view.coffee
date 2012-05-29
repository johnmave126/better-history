class BH.Views.Modal extends BH.Views.BaseView
  pulseClass: 'pulse'

  generalEvents:
    'click .close-button': 'close'
    'click .overlay': 'pulse'

  attachGeneralEvents: ->
    _.extend(@events, @generalEvents)

  template: (json) ->
    overlay = $($('#modal').html())
    $('.page', overlay).append(Mustache.render($("##{@templateId}").html(), json))
    overlay

  open: ->
    @_globalBinds()
    @$('.overlay').fadeIn 'fast', ->
      $(@).children().fadeIn 'fast', ->
        $(window).trigger('resize')

  pulse: ->
    @$('.page').addClass('pulse')

  close: ->
    @trigger('close')
    @$('.overlay').fadeOut 'fast', =>
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
