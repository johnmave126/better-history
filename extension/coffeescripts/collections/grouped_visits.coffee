class BH.Collections.GroupedVisits extends Backbone.Collection
  model: BH.Models.Visit

  toTemplate: ->
    visits = []
    @each (model) ->
      visits.push(model.toTemplate())

    _.extend
      domain: @at(0).domain()
      url: @at(0).get('url')
      isGrouped: true
    , groupedVisits: visits


  destroyAll: ->
    while(@length > 0)
      @at(0).destroy() if @at(0)

