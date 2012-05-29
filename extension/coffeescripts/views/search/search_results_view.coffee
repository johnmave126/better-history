class BH.Views.SearchResultsView extends BH.Views.BaseView
  templateId: 'search_results'

  events:
    'click .delete_visit': 'deleteClicked'

  render: ->
    @$el.html(@template(_.extend(i18n.search(), @collection.toTemplate())))
    @

  deleteClicked: (ev) ->
    ev.preventDefault()
    model = @_getModelFromElement($(ev.currentTarget))
    model.destroy
      success: =>
        @_getElementFromModel(model).slideUp 'fast', ->
          @.remove()


  _getModelFromElement: (element) ->
    @collection.get($(element).parents('a').data().id)

  _getElementFromModel: (model) ->
    $("[data-id=#{model.id}]").parents('li')
