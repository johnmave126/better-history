class BH.Models.Week extends BH.Models.Base
  initialize: ->
    id = @get('date').format('D-M-YY')

    title = @chromeAPI.i18n.getMessage('date_week_label', [
      @get('date').format(@chromeAPI.i18n.getMessage('short_date_with_day'))
    ])
    shortTitle = @get('date').format(@chromeAPI.i18n.getMessage('short_date'))

    @set
      shortTitle: shortTitle
      title: title
      id: id
      url: new BH.Helpers.UrlBuilder().build('week', [id])
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

  sync: (method, model, options) ->
    if method == 'read'
      callCount = 0
      success = =>
        if callCount == 6
          options.success()
        else
          callCount++

      @get('days').each (model) ->
        model.fetch {success: success}

  destroyHistory: ->
      @get('days').destroyHistory()

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

  _generateDate: (amount) ->
    moment(@get('date')).add('days', amount)
