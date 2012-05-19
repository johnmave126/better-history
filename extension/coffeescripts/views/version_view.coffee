BH.Views.VersionView extends BH.Views.Modal
  className: 'version_view'

  templateId: 'version'

  events:
    'click .close': 'closeClicked'

  initialize: ->
    @attachGeneralEvents()

  render: ->
    @$el.html(@template(@model.toTemplate()))
    @

  closeClicked: (ev) ->
    ev.preventDefault()
    @model.setSuppress(true)
    @close()
    BH.router.navigate('#settings')

  openClicked: (ev) ->
    ev.preventDefault()
    @open()
