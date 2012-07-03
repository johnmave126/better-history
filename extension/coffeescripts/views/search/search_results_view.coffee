class BH.Views.SearchResultsView extends BH.Views.BaseView
  template: BH.Templates['search_results']

  events:
    'click .delete_visit': 'deleteClicked'

  render: ->
    @$el.html(@renderTemplate(_.extend(@getI18nValues(), @collection.toTemplate(grouped: false))))
    @

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
