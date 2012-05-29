class BH.Models.State extends Backbone.Model
  storeName: 'state'

  initialize: ->
    @bind('change', @save, @)

  parse: (data) ->
    @set(JSON.parse(data))
