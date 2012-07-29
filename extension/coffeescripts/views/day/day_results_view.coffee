class BH.Views.DayResultsView extends BH.Views.BaseView
  template: BH.Templates['day_results']

  events:
    'click .delete_visit': 'deleteVisitClicked'
    'click .delete_grouped_visit': 'deleteGroupedVisitClicked'
    'click .delete_interval': 'deleteIntervalClicked'
    'click .show_visits': 'toggleGroupedVisitsClicked'
    'click .hide_visits': 'toggleGroupedVisitsClicked'
    'click .visit > a': 'visitClicked'

  render: ->
    @$el.html(@renderTemplate(_.extend(@getI18nValues(), @model.toTemplate(), @collection.toTemplate())))

  visitClicked: (ev) ->
    if $(ev.target).hasClass('search_domain')
      ev.preventDefault()
      router.navigate($(ev.target).attr('href'), trigger: true)

  deleteIntervalClicked: (ev) ->
    ev.preventDefault()
    element = @_getTopElement(ev.currentTarget)
    @collection.get($(element).data('id')).get('visits').destroyAll
      success: =>
        @removeElement(element)

  deleteVisitClicked: (ev) ->
    ev.preventDefault()
    element = @_getTopElement(ev.currentTarget)
    intervalId = $(ev.currentTarget).parents('.interval').data('id')
    interval = @collection.get(intervalId)
    interval.findVisitById($(element).data('id')).destroy
      success: =>
        @removeElement(element)

  deleteGroupedVisitClicked: (ev) ->
    ev.preventDefault()

    $(ev.currentTarget).siblings('.visits').children().each (i, visit) ->
      $(visit).find('.delete').click()

    @removeElement($(ev.currentTarget).parents('.visit'))

  toggleGroupedVisitsClicked: (ev) ->
    ev.preventDefault()
    $(ev.currentTarget).parents('.visit')
      .toggleClass('expanded')

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
      'expand_button'
      'collapse_button'
      'search_by_domain'
    ])
