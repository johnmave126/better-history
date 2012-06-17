class BH.Views.PromptView extends BH.Views.Modal
  className: 'prompt_view'

  template: BH.Templates['prompt']

  events:
    'click .no': 'clickedNo'
    'click .yes': 'clickedYes'

  initialize: ->
    @attachGeneralEvents()

  render: ->
    @$el.html(@renderTemplate(_.extend(@getI18nValues(), @model.toTemplate())))
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

  getI18nValues: ->
    @i18nFetcher.get([
      'prompt_delete_button',
      'prompt_cancel_button',
      'prompt_title'
    ])

BH.Views.CreatePrompt = (content) ->
  view = new BH.Views.PromptView
    model: new BH.Models.Prompt({content: content})
  $('body').append(view.render().el)
  view

