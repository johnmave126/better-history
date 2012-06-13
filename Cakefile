util = require('util')
{spawn, exec} = require('child_process')

puts = (error, stdout, stderr) -> util.puts stdout

task 'package', 'package extension into .zip', ->
  exec('zip -r -x=extension/coffeescripts/* extension.zip extension', puts)

task 'compile', 'watch JavaScripts for changes', ->
  options = ['-o', 'extension/javascripts', '-cw', 'extension/coffeescripts']
  coffee = spawn('coffee', options)
  coffee.stdout.on 'data', (data) -> util.puts data.toString().trim()

task 'autotest', 'start jasmine-node runner', ->
  options = ['--autotest', '--color', '--coffee', 'specs/coffeescripts']
  jasmine = spawn('jasmine-node', options)
  jasmine.stdout.on 'data', (data) -> util.puts data.toString().trim()
