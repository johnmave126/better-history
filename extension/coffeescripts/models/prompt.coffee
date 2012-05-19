class BH.Models.Prompt extends Backbone.Model
  toTemplate: ->
    _.extend @toJSON(), i18n.prompt()
