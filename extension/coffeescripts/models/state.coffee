class BH.Models.State extends Backbone.Model
  storeName: 'state'

  defaults:
    route: 'filter/0_days_ago'

  initialize: ->
    @bind('change', @save, @)

  parse: (data) ->
    @set(JSON.parse(data))
