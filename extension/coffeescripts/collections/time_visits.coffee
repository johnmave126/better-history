class BH.Collections.TimeVisits extends Backbone.Collection
  model: BH.Models.TimeVisit

  toTemplate: ->
    timeVisits = {}
    @each (model) ->
      timeVisits.push(model.toTemplate())
    {timeVisits: timeVisits}

  destroyAll: ->
    while(@length > 0)
      @at(0).destroy() if @at(0)
