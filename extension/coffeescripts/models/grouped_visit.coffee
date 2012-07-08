class BH.Models.GroupedVisit extends Backbone.Model

  initialize: (attr) ->
    @visits = new BH.Collections.GroupedVisits(attr)
    @set
      domain: @visits.at(0).domain()
      url: @visits.at(0).get('url')
      isGrouped: true

  toTemplate: ->
    _.extend @toJSON(), groupedVisits: @visits.toTemplate()


  destroyAll: ->
    while(@length > 0)
      @at(0).destroy() if @at(0)

