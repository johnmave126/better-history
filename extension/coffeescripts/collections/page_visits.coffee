class BH.Collections.PageVisits extends Backbone.Collection
  model: BH.Models.PageVisit

  destroyAll: ->
    while(@length > 0)
      this.at(0).destroy() if @at(0)
