class BH.Models.State extends BH.Models.Base
  storeName: 'state'

  initialize: (attrs, options) ->
    super(attrs, options)

    weekId = @startingWeekDate().format('M-D-YY')
    @set route: @urlBuilder.build('week', weekId)

  updateRoute: ->
    if @settings.get('openLocation') == 'current_day'
      route = @urlBuilder.build 'day', moment(new Date()).format('M-D-YY')

    else if @settings.get('openLocation') == 'current_week'
      weekId = @startingWeekDate().format('M-D-YY')
      route = @urlBuilder.build 'week', weekId

    @set route: route if route?
    @save()

  startingWeekDate: ->
    moment(new Date()).past(@t(@settings.get 'startingWeekDay'), 0)

  parse: (data) ->
    JSON.parse data
