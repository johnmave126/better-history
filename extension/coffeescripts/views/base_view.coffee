class BH.Views.BaseView extends Backbone.View
  cssClass:
    selected: 'selected'

  template: (json) ->
    Mustache.render($('#' + this.templateId).html(), json)

  select: ->
    $('.mainview > *').removeClass(@cssClass.selected)
    @$el.addClass(@cssClass.selected)
    @pageTitle() if @pageTitle
