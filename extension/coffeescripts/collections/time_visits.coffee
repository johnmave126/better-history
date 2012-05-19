class BH.Collections.TimeVisits extends Backbone.Collection
  model: BH.Models.TimeVisit

  destroyAll: ->
    while(@length > 0)
      @at(0).destroy() if @at(0)
