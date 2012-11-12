BH.Modules.localStorageSupport =
  sync: _.wrap(@sync, ->
    args = Array.prototype.slice.call(arguments, 1)
    if args[0] == 'read'
      if localStorage[@storeName]
        args[2].success(localStorage[@storeName])
    else if args[0] == 'create'
      localStorage[@storeName] = JSON.stringify(@)
      args[2].success(localStorage[@storeName])
  )
