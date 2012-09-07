class BH.Models.State extends BH.Models.Base
  storeName: 'state'

  defaults: ->
    urlBuilder = new BH.Helpers.UrlBuilder()
    route: urlBuilder.build('week', [appView.collection.at(0).id])

  initialize: ->
    @bind 'change', @save, @

  parse: (data) ->
    data = JSON.parse data
    urlBuilder = new BH.Helpers.UrlBuilder()

    if settings.get('openLocation') == 'current_day'
      data.route = urlBuilder.build 'day', [
        appView.collection.at(0).id,
        new Date().getDate()
      ]
    else if settings.get('openLocation') == 'current_week'
      data.route = urlBuilder.build 'week', [
        appView.collection.at(0).id
      ]

    data
