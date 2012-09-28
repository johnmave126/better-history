class BH.Collections.Weeks extends Backbone.Collection
  model: BH.Models.Week

  toTemplate: ->
    weeks = []
    @each (model) ->
      weeks.push(model.toTemplate())
    {weeks: weeks}

  reload: (startingDay) ->
    @reset()
    _(_.range(10)).each (i) =>
      @add date: moment().past(chrome.i18n.getMessage(startingDay), i)
    @trigger 'reloaded'
