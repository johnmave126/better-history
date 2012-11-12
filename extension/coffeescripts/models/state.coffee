class BH.Models.State extends BH.Models.Base
  @include BH.Modules.chromeSupport
  @include BH.Modules.urlSupport

  storeName: 'state'

  initialize: (attrs, options) ->
    @settings = options.settings

    weekId = @startingWeekDate().format('M-D-YY')
    @set route: @urlFor('week', weekId)

  updateRoute: ->
    if @settings.get('openLocation') == 'current_day'
      route = @urlFor 'day', moment(new Date()).format('M-D-YY')

    else if @settings.get('openLocation') == 'current_week'
      weekId = @startingWeekDate().format('M-D-YY')
      route = @urlFor 'week', weekId

    @set route: route if route?
    @save()

  startingWeekDate: ->
    moment(new Date()).past(@t(@settings.get 'startingWeekDay'), 0)

  parse: (data) ->
    JSON.parse data
