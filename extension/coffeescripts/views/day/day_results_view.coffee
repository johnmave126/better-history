class BH.Views.DayResultsView extends BH.Views.BaseView
  template: BH.Templates['day_results']

  events:
    'click .delete_visit': 'deleteVisitClicked'
    'click .delete_interval': 'deleteIntervalClicked'

  render: ->
    @$el.html(@renderTemplate(_.extend(@getI18nValues(), @model.toTemplate(), @collection.toTemplate())))

  deleteIntervalClicked: (ev) ->
    ev.preventDefault()
    element = @_getTopElement(ev.currentTarget)
    @collection.get($(element).data('id')).get('pageVisits').destroyAll
      success: =>
        @removeElement(element)

  deleteVisitClicked: (ev) ->
    ev.preventDefault()
    element = @_getTopElement(ev.currentTarget)
    @collection.findVisitById($(element).data('id')).destroy
      success: =>
        @removeElement(element)

  removeElement: (element)->
    element.slideUp 'fast', ->
      element.remove()

  _getTopElement: (element) ->
    $(element).parents('[data-id]').first()

  getI18nValues: ->
    @i18nFetcher.get([
      'prompt_delete_button'
      'delete_time_interval_button'
      'no_visits_found'
    ])
