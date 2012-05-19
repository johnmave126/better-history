class BH.Collections.Days extends Backbone.Collection
  model: BH.Models.Day

  toTemplate: ->
    days = []
    @each (model) ->
      days.push(model.toTemplate())
    {days: days}

  clear: ->
    @each (model) ->
      model.clear()
