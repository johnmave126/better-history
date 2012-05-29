class BH.Views.BaseView extends Backbone.View
  template: (json) ->
    Mustache.render($('#' + this.templateId).html(), json)
