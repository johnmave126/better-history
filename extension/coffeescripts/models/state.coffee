class BH.Models.State extends BH.Models.Base
  storeName: 'state'

  initialize: ->
    @bind('change', @save, @)

  parse: (data) ->
    @set(JSON.parse(data))
