@worker = (name, options, callback) ->
  if name == 'sanitizer'
    path = 'javascripts/workers/sanitizer.js'
  else if name == 'grouper'
    path = 'javascripts/workers/grouper.js'

  worker = new Worker(path)
  worker.onmessage = (e) ->
    callback(e.data)
  worker.postMessage(options)
