class BH.Collections.Visits extends Backbone.Collection
  model: BH.Models.Visit

  destroyAll: ->
    while(@length > 0)
      this.at(0).destroy() if @at(0)
  toTemplate: ->
    visits = []
    @each (model) ->
      visits.push(model.toTemplate())

    {visits: visits, noVisits: @noVisits(), hasVisits: @hasVisits()}

  noVisits: ->
    if @models.length == 0 then true else false

  hasVisits: ->
    !@noVisits()

