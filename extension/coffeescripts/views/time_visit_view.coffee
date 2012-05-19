class BH.Views.TimeVisitView extends Backbone.View
  className: 'time_visit_view'
  templateId: 'timeVisit'

  events:
    'click .delete_interval': 'deleteTimeVisit'

  initialize: ->
    @collection.on('destroy', @updateCount, @)

  render: ->
    @$el.html(@template(@model.toTemplate()))
    groupedVisits
    if settings.get('domainGrouping')
      groupedVisits = GroupBy.domain(@collection)

    $.each groupedVisits || @collection.models, (i, pageVisit) ->
      if pageVisit.length != undefined
        view = new BH.Views.GroupedVisitsView({collection: pageVisit})
      else
        view = new BH.Views.PageVisitView({model: pageVisit})
      $('.visits', self.$el).append(view.render().$el)
    @

  updateCount: ->
    if @collection.length >= 1
      $('.summary', @el).html(chrome.i18n.getMessage('number_of_visits', [
        @collection.length.toString(),
        '<span class="amount">',
        '</a>'
      ]))
      $('.summary', @el).css({color: '#000'}).animate({color:'#999'}, 'slow')
    else
      @_remove()

  deleteTimeVisit: (ev) ->
    @collection.destroyAll()
    @_remove()

  _remove: ->
    @$el.slideUp 'fast', ->
      @.remove()
