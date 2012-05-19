class BH.Views.DayView extends BH.Views.Modal
  className: 'day_view'
  templateId: 'day'

  events:
    'click .delete_all': 'clickedDeleteAll'
    'keyup .search': 'filtered'

  initialize: (config) ->
    @attachGeneralEvents()
    @model.on('change', @renderHistory, @)

  render: (type) ->
    @$el.html(@template(_.extend(i18n.day(), @model.toTemplate())))
    @$('.content').css({opacity:0}).html('')
    @$('button').attr('disabled', 'disabled')
    @

  renderHistory: ->
    @collection = @model.get('history')

    @$('.search').focus()
    contentElement = @$('.content')
    $(contentElement).css({opacity:0}).html('')

    @collection.each (model) ->
      $(contentElement).append(new BH.Views.TimeVisitView(
        model: model,
        collection: model.get('pageVisits')
      ).render().el)

    if @collection.length == 0
      $(contentElement)
        .append(Mustache.render($('#noVisits').html(), i18n.day()))
        .css({opacity:1})
      @$('button').attr('disabled', 'disabled')
      $(document).scrollTop(0)

      if @model.get('filter')
        @$('.content').append('<a href="3">Maybe try searching full history?</a>')
    else
      if @startTime
        offset = $("[data-time='#{@startTime}']").offset()
        $('body').scrollTop((if offset then offset.top else 0) - 104)

      $(contentElement).css({opacity:1})

      $('.time_visit_view').stickyElements({
        stickyClass:'time_interval',
        padding:104
      }, (element) ->
        self.updateRoute(element)
      )

      Helpers.tabIndex($('.content a', @el))
      @$('button').attr('disabled', null)
      $('.spacer').remove()
      @$el.append('<div class="spacer" />')
      @$('.spacer').height($(window).height() - @$('.time_visit_view:last-child').height() - 210)


  clickedDeleteAll: (ev) ->
    if $(ev.target).parent().attr('disabled') != 'disabled'
      ev.preventDefault()
      @promptView = CreatePrompt(chrome.i18n.getMessage('confirm_delete_all_visits', [@model.get('extendedFormalDate')]))
      @promptView.open()
      @promptView.model.on('change', @deleteAction, @)

  deleteAction: (prompt) ->
    if prompt.get('action')
      if @collection
        @promptView.spin()
        @model.clear()
        @promptView.close()
    else
      @promptView.close()

  filtered: (ev) ->
    @model.set({filter: $(ev.currentTarget).val()})
