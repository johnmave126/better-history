@worker = (path, options, callback) ->
  worker = new Worker(path)
  worker.onmessage = (e) ->
    callback(e.data)
  worker.postMessage(options)
