class BH.Views.PageVisitView extends Backbone.View
  className: 'page_visit_view'
  templateId: 'pageVisit'

  events:
    'click .delete_visit': 'deleteClicked'

  render: ->
    @$el.html(@template(@model.toTemplate()))
    @

  deleteClicked: (ev) ->
    ev.preventDefault()
    @model.destroy
      success: =>
        method = if @_isGroupedAndEmpty() then '_removeGroup' else '_remove'
        @[method]()

  _remove: ->
    @$el.slideUp 'fast', ->
      $el.remove()

  _removeGroup: ->
    $(@_getGroup()).slideUp 'fast', ->
      $el.remove()

  _isGroupedAndEmpty: ->
    if @$el.parents('.expanded').children().length == 1
      true
    else
      false

  _getGroup: ->
    @$el.parents('.grouped_visits_view')
