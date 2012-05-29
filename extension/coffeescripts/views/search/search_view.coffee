class BH.Views.SearchView extends BH.Views.ViewWithSearch
  className: 'search_view'
  templateId: 'search'

  events:
    'click .delete_all': 'clickedDeleteAll'

  initialize: ->
    @model.on('change:title', @refreshTitle, @)
    @model.on('change:history', @renderVisits, @)
    @model.on('change:query', @refreshTitle, @)
    super()

  render: ->
    @$el.append(@template(_.extend(i18n.search(), @model.toTemplate())))
    @

  refreshTitle: ->
    @$('.title').text(@model.get('title'))
    @$('.content').html('')
    @model.fetch()

  renderVisits: ->
    @collection = @model.get('history')

    @$('.search').focus()
    contentElement = @$el.children('.content')
    @$('.number_of_results').text(chrome.i18n.getMessage('number_of_search_results', [@collection.length]))

    new BH.Views.SearchResultsView(
      collection: @collection
      el: contentElement
    ).render()

    if @collection.length == 0
      @$('.delete_all').attr('disabled', 'disabled')
    else
      @$('.delete_all').attr('disabled', null)

    Helpers.tabIndex($(contentElement).find('a'))

  clickedDeleteAll: (ev) ->
    ev.preventDefault()
    if $(ev.target).parent().attr('disabled') != 'disabled'
      @promptView = BH.Views.CreatePrompt(chrome.i18n.getMessage('confirm_delete_all_search_results'))
      @promptView.open()
      @promptView.model.on('change', @deleteAction, @)

  deleteAction: (prompt) ->
    if prompt.get('action')
      @promptView.spin()
      @collection.destroyAll()
      @model.fetch
        success: (model) =>
          model.trigger('change:history') # make sure
          @promptView.close()
    else
      @promptView.close()
