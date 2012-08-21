class BH.Collections.GroupedVisits extends Backbone.Collection
  model: BH.Models.Visit

  toTemplate: ->
    visits = []
    @each (model) ->
      visits.push(model.toTemplate())
    visits
