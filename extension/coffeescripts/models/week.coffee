class BH.Models.Week extends Backbone.Model
  format:
    shortTitle: chrome.i18n.getMessage('short_date')
    title: chrome.i18n.getMessage('date_week_label', [
      chrome.i18n.getMessage('short_date_with_day')
    ])
    id: 'D-M-YY'

  initialize: ->
    id = @_weekFormat('id')
    @set
      shortTitle: @_weekFormat('shortTitle')
      title: @_weekFormat('title')
      id: id
      url: BH.Lib.Url.week(id)
      days: new BH.Collections.Days([
        {date: @_generateDate(0), weekId: id}
        {date: @_generateDate(1), weekId: id}
        {date: @_generateDate(2), weekId: id}
        {date: @_generateDate(3), weekId: id}
        {date: @_generateDate(4), weekId: id}
        {date: @_generateDate(5), weekId: id}
        {date: @_generateDate(6), weekId: id}
      ])

  toTemplate: ->
    _.extend @toJSON(), @get('days').toTemplate()

  clear: ->
    @get('days').clear()

  sync: (method, model, options) ->
    if method == 'read'
      callCount = 0
      success = ->
        if callCount == 6
          options.success()
        else
          callCount++

      @get('days').each (model) ->
        model.fetch {success: success}

  parse: ->
    percentages = []
    count = 0

    visits = @get('days').map (model) ->
      count += model.get('count')
      model.get('count')

    largest = Math.max.apply(Math, visits) || 0
    @get('days').each (model) ->
      if largest == 0
        percentages.push 0
      else
        percentages.push(model.get('count')/largest*100)

    {percentages: percentages, count: count}

  _weekFormat: (type) ->
    @get('date').format(@format[type])

  _generateDate: (amount) ->
    moment(@get('date')).add('days', amount)
