class BH.Collections.Days extends Backbone.Collection
  model: BH.Models.Day

  initialize: (models, options) ->
    _.each _.range(7), (i) =>
      @add
        date: moment(options.week.get('date')).add('days', i)
        weekId: options.week.id

  toTemplate: ->
    days = []
    @each (model) ->
      days.push(model.toTemplate())
    days.reverse() if settings.get('weekDayOrder') == 'descending'
    days: days

  destroyHistory: ->
    @each (model) ->
      model.destroyHistory()

  visitTotals: ->
    @map (model) -> model.get 'count'

  totalVisits: ->
    count = 0
    _.each @visitTotals(), (total) ->
      count += total
    count

  totalPercentages: ->
    largest = Math.max.apply(Math, @visitTotals()) || 0
    percentages = []
    @each (model) ->
      value = if largest == 0 then 0 else model.get('count') / largest * 100
      percentages.push value
    percentages
