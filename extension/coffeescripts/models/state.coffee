class BH.Models.State extends BH.Models.Base
  storeName: 'state'

  initialize: ->
    urlBuilder = new BH.Helpers.UrlBuilder()
    date = moment().past(chrome.i18n.getMessage(settings.get 'startingWeekDay'), 0)
    @set route: urlBuilder.build('week', [date.format('D-M-YY')])

  updateRoute: ->
    urlBuilder = new BH.Helpers.UrlBuilder()
    date = moment().past(chrome.i18n.getMessage(settings.get 'startingWeekDay'), 0)
    if settings.get('openLocation') == 'current_day'
      route = urlBuilder.build 'day', [
        date.format('D-M-YY'),
        new Date().getDate()
      ]
    else if settings.get('openLocation') == 'current_week'
      route = urlBuilder.build 'week', [
        date.format('D-M-YY')
      ]

    @set route: route if route?
    @save()

  parse: (data) ->
    JSON.parse data
