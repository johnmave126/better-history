class BH.Models.State extends BH.Models.Base
  storeName: 'state'

  initialize: (attrs, options) ->
    @settings = options.settings
    weekId = @startingWeekDate().format('D-M-YY')
    @set route: @urlBuilder.build('week', weekId)

  updateRoute: ->
    if @settings.get('openLocation') == 'current_day'
      route = @urlBuilder.build 'day', moment().format('D-M0YY')

    else if @settings.get('openLocation') == 'current_week'
      weekId = @startingWeekDate().format('D-M-YY')
      route = @urlBuilder.build 'week', weekId

    @set route: route if route?
    @save()

  startingWeekDate: ->
    moment().past(chrome.i18n.getMessage(@settings.get 'startingWeekDay'), 0)

  parse: (data) ->
    JSON.parse data
