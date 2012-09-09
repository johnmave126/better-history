class BH.Models.State extends BH.Models.Base
  storeName: 'state'

  defaults: ->
    urlBuilder = new BH.Helpers.UrlBuilder()
    date = moment().past(chrome.i18n.getMessage('monday'), 0)

    route: urlBuilder.build('week', [date.format('D-M-YY')])

  updateRoute: (settings) ->
    urlBuilder = new BH.Helpers.UrlBuilder()
    date = moment().past(chrome.i18n.getMessage('monday'), 0)
    if settings.get('openLocation') == 'current_day'
      route = urlBuilder.build 'day', [
        date.format('D-M-YY'),
        new Date().getDate()
      ]
    else if settings.get('openLocation') == 'current_week'
      route = urlBuilder.build 'week', [
        date.format('D-M-YY')
      ]
    else if settings.get('openLocation') == 'last_visit'
      route = window.location.hash

    @set route: route if route?

  parse: (data) ->
    JSON.parse data
