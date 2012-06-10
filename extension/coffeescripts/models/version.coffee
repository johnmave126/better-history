class BH.Models.Version extends Backbone.Model
  initialize: ->
    @set
      suppress: @_stringToBool(localStorage[@suppressKey()])

  toTemplate: ->
    _.extend
      visibility: if @get('suppress') then '' else 'show'
    , i18n.version()

  key: ->
    "versions.#{@get('version')}"

  setSuppress: (value) ->
    if value
      localStorage[@suppressKey()] = @_boolToString(value)
    else
      delete(localStorage[@suppressKey()])
    @set({suppress: value})

  suppressKey: ->
    "#{@key()}.suppress"

  _stringToBool: (string) ->
    if string == 'true' then true else false

  _boolToString: (bool) ->
    if bool then 'true' else 'false'
