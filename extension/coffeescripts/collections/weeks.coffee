class BH.Collections.Weeks extends Backbone.Collection
  model: BH.Models.Week

  toTemplate: ->
    weeks = []
    @each (model) ->
      weeks.push(model.toTemplate())
    {weeks: weeks}
