class BH.Views.MenuView extends BH.Views.BaseView
  template: BH.Templates['menu']

  events:
    'click .menu > *': 'weekClicked'

  render: ->
    @$el.html @renderTemplate(@collection.toTemplate())

  weekClicked: (ev) ->
    @$('.menu > *').removeClass @cssClass.selected
    $(ev.currentTarget).addClass @cssClass.selected
