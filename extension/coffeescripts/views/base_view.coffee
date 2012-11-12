class BH.Views.BaseView extends Backbone.View
  renderTemplate: (json) ->
    Mustache.to_html(@template, json)
