class BH.Collections.Intervals extends Backbone.Collection
  model: BH.Models.Interval

  toTemplate: ->
    intervals = []
    @each (model) ->
      intervals.push(model.toTemplate())

    intervals: intervals
    noIntervals: @noIntervals()
    hasIntervals: @hasIntervals()

  destroyAll: ->
    while(@length > 0)
      @at(0).destroy() if @at(0)

  noIntervals: ->
    if @models.length == 0 then true else false

  hasIntervals: ->
    !@noIntervals()
