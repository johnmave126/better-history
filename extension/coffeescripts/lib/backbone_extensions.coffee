_.extend Backbone.Model.prototype,
  sync: _.wrap(Backbone.Model.prototype.sync, ->
    args = Array.prototype.slice.call(arguments, 1)
    if @storeName
      if args[0] == 'read'
        if localStorage[this.storeName]
          args[2].success(localStorage[this.storeName])
      else if args[0] == 'create'
        localStorage[this.storeName] = JSON.stringify(this)
        args[2].success(localStorage[this.storeName])
    else
      arguments[0].apply(this, args)
  )

moduleKeywords = ['extended', 'included']

class Module
  @extend: (obj) ->
    for key, value of obj when key not in moduleKeywords
      @[key] = value

    obj.extended?.apply(@)
    this

  @include: (obj) ->
    for key, value of obj when key not in moduleKeywords
      # Assign properties to the prototype
      @::[key] = value

    obj.included?.apply(@)
    this

Backbone.Model.include = Backbone.View.include = Backbone.Collection.include = Module.include
