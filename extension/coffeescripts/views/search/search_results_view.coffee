class BH.Views.SearchResultsView extends BH.Views.BaseView
  template: BH.Templates['search_results']

  events:
    'click .delete_visit': 'deleteClicked'

  render: ->
    collectionToTemplate = @collection.toTemplate(grouped: false)
    highlightedVisits = []
    _(collectionToTemplate.visits).each (visit) =>
      highlightedVisits.push(@markMatches(visit))
    collectionToTemplate.visits = highlightedVisits
    @$el.html(@renderTemplate(_.extend(@getI18nValues(), collectionToTemplate)))
    @

  markMatches: (visit) ->
    regExp = titleMatch = locationMatch = timeMatch = null

    _.each @model.terms, (term) =>
      regExp = new RegExp(term, "i")
      visit.title = @_wrapMatchInProperty(regExp, visit.title)
      visit.location = @_wrapMatchInProperty(regExp, visit.location)
      visit.time = @_wrapMatchInProperty(regExp, visit.time)
    visit

  _wrapMatchInProperty: (regExp, property, match) ->
    match = property.match(regExp)
    if match then property.replace(regExp, '<span class="match">' + match + '</span>') else property


  deleteClicked: (ev) ->
    ev.preventDefault()
    model = @_getModelFromElement($(ev.currentTarget))
    model.destroy
      success: =>
        @_getElementFromModel(model).slideUp 'fast', ->
          $(@).remove()

  _getModelFromElement: (element) ->
    @collection.get($(element).parents('a').data().id)

  _getElementFromModel: (model) ->
    $("[data-id=#{model.id}]").parents('li')

  getI18nValues: ->
    @i18nFetcher.get([
    ])
