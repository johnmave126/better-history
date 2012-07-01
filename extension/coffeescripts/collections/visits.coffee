class BH.Collections.Visits extends Backbone.Collection
  model: BH.Models.Visit

  destroyAll: (options) ->
    while(@length > 0)
      @at(0).destroy() if @at(0)
    options.success() if options?

  toTemplate: ->
    if settings.get('domainGrouping')
      groupedVisits = new BH.Lib.HistoryGrouper().domain(@)

    visits = []
    _.each groupedVisits || @models, (model) ->
      visits.push(model.toTemplate())

    visits: visits
    noVisits: @noVisits()
    hasVisits: @hasVisits()

  noVisits: ->
    if @models.length == 0 then true else false

  hasVisits: ->
    !@noVisits()
