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
