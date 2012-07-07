@worker = (name, options, callback) ->
  if name == 'sanitizer'
    path = 'javascripts/workers/visits_sanitizer.js'
  else if name == 'time_grouper'
    path = 'javascripts/workers/time_grouper.js'
  else if name == 'domain_grouper'
    path = 'javascripts/workers/domain_grouper.js'

  worker = new Worker(path)
  worker.onmessage = (e) ->
    callback(e.data)
  worker.postMessage(options)
