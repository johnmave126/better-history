class BH.Views.PromptView extends BH.Views.Modal
  className: 'prompt_view'

  templateId: 'prompt'

  events:
    'click .no': 'clickedNo'
    'click .yes': 'clickedYes'

  initialize: ->
    @attachGeneralEvents()

  render: ->
    @$el.html(@template(@model.toTemplate()))
    @

  clickedNo: (ev) ->
    ev.preventDefault()
    @model.set({action: false})

  clickedYes: (ev) ->
    ev.preventDefault()
    @model.set({action: true})

  spin: ->
    @$('button').animate {opacity: 0}, 'fast', =>
      @$('.spinner').spin()
      @$('.close-button').fadeOut()

BH.Views.CreatePrompt = (content) ->
  view = new BH.Views.PromptView
    model: new BH.Models.Prompt({content: content})
  $('body').append(view.render().el)
  view
