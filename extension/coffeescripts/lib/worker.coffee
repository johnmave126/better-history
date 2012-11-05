@worker = (name, options, callback) ->
  path = switch name
    when 'sanitizer'
      'javascripts/workers/sanitizer.js'
    when 'domainGrouper'
      'javascripts/workers/domain_grouper.js'
    when 'timeGrouper'
      'javascripts/workers/time_grouper.js'
    when 'dayGrouper'
      'javascripts/workers/day_grouper.js'

  worker = new Worker(path)

  worker.onmessage = (e) ->
    if (e.data.log)
      console.log(e.data.log)
    else
      callback(e.data)
  worker.postMessage(options)
