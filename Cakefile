coffee = require 'coffee-script'
util = require 'util'
{exec} = require 'child_process'
glob = require 'glob'
fs = require 'fs'
path = require 'path'
yaml = require 'js-yaml'

coffeeCompile = (file) ->
  code = fs.readFileSync(file).toString()
  jsFile = file
    .replace('.coffee', '.js')
    .replace('coffeescripts', 'javascripts')
  fs.writeFileSync jsFile, coffee.compile(code)

task 'run', 'start up development', ->
  invoke 'clean'
  invoke 'compile'
  invoke 'concat'
  invoke 'watch'
  invoke 'build'

task 'build','build extension to install or distribute', ->
  console.log 'Building extension'
  exec 'make build'

task 'clean', 'remove all generated javascript', ->
  console.log "Cleaning javascript"
  for file in glob.sync("extension/javascripts/**/*.js")
    unless file.match(/framework/)
      fs.unlinkSync(file)

task 'compile', 'compile extension coffee', ->
  console.log "Compiling coffee"
  for file in glob.sync("extension/**/*.coffee")
    coffeeCompile(file)

task 'concat', 'concat templates and js', ->
  invoke 'concat:templates'
  invoke 'concat:js'

task 'concat:templates', 'concat templates', ->
  console.log "Concating templates"
  filepaths = glob.sync("extension/templates/*.html")
  concatedTemplates = ''
  for filepath in filepaths
    key = path.basename(filepath, '.html')
    code = fs.readFileSync(filepath).toString()
    template = code.replace(/\n/g, '').replace(/\"/, '\"')
    concatedTemplates += "BH.Templates.#{key} = \"#{template}\";\n\n"
  filepath = 'extension/javascripts/templates.js'
  fs.writeFileSync filepath, concatedTemplates

task 'concat:js', 'concat javascript', ->
  console.log "Concating javascript"
  assets = fs.readFileSync('extension/assets.yml')
  assets = yaml.load assets.toString()
  for section in ['extension', 'background']
    concatedFile = "extension/javascripts/generated_#{section}.js"
    if fs.existsSync concatedFile
      fs.unlinkSync concatedFile
    license = fs.readFileSync("LICENSE")
    packaged = "/* \n#{license}*/\n"
    for asset in assets[section]
      if asset.match(/\*/)
        filepaths = glob.sync("extension/javascripts/#{asset}")
        for filepath in filepaths
          packaged += "\n\n// #{filepath}\n"
          packaged += fs.readFileSync(filepath)
      else
        filepath = "extension/javascripts/#{asset}.js"
        packaged += "\n\n// #{filepath}\n"
        packaged += fs.readFileSync(filepath)
    sectionPath = "extension/javascripts/generated_#{section}.js"
    fs.writeFileSync(sectionPath, packaged)

task 'watch', 'watch coffee and template files', ->
  invoke 'watch:coffee'
  invoke 'watch:templates'
  invoke 'watch:locales'

task 'watch:coffee', 'watch coffee for changes', ->
  for filepath in glob.sync("extension/coffeescripts/**/*.coffee")
    fs.watchFile filepath, {}, ->
      console.log '== Coffee changed'
      invoke 'compile'
      invoke 'concat:js'
      invoke 'build'

task 'watch:templates', 'watch templates for changes', ->
  for filepath in glob.sync("extension/templates/*.html")
    fs.watchFile filepath, {}, ->
      console.log '== Template Changed'
      invoke 'concat:templates'
      invoke 'build'

task 'watch:locales', 'watch locales for changed', ->
  for filepath in glob.sync("extension/_locales/**/*.json")
    fs.watchFile filepath, {}, ->
      console.log '== Locale Changed'
      invoke 'build'
