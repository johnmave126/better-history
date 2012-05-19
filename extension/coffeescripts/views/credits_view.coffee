class BH.Views.CreditsView extends BH.Views.Modal
  className: 'credits_view'
  templateId: 'credits'

  events:
    'click .close': 'closeClicked'

  initialize: ->
    @attachGeneralEvents()

  render: ->
    @$el.html(@template(i18n.credits()))
    return this

  closeClicked: (ev) ->
    ev.preventDefault()
    @close()
    BH.router.navigate('#settings')

  openClicked: (ev) ->
    ev.preventDefault()
    @open()
