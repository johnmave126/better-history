class BH.Views.VisitView extends BH.Views.BaseView
  className: 'visit_view'
  template: BH.Templates['visit']

  events:
    'click .delete_visit': 'deleteClicked'

  render: ->
    @$el.html(@renderTemplate(_.extend(@getI18nValues(), @model.toTemplate())))
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

  getI18nValues: ->
    @i18nFetcher.get([
      'prompt_delete_button'
    ])
