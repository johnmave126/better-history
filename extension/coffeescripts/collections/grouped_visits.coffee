class BH.Collections.GroupedVisits extends Backbone.Collection
  model: BH.Models.PageVisit

  toTemplate: ->
    _.extend
      domain: @at(0).domain()
      url: @at(0).get('url')
    , i18n.groupedVisits()

  destroyAll: ->
    while(@length > 0)
      @at(0).destroy() if @at(0)

