class BH.Models.Version extends Backbone.Model
  initialize: ->
    @set
      suppress: stringToBool(localStorage[@suppressKey()])

  toTemplate: ->
    _.extend
      visibility: if @get('suppress') then '' else 'show'
    , i18n.version()

  key: ->
    "versions.#{@get('version')}"

  setSuppress: (value) ->
    if value
      localStorage[@suppressKey()] = boolToString(value)
    else
      delete(localStorage[@suppressKey()])
    @set({suppress: value})

  suppressKey: ->
    "#{@key()}.suppress"
