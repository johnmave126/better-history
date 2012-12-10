coffee = require 'coffee-script'
util = require 'util'
{exec} = require 'child_process'
glob = require 'glob'
fs = require 'fs'
path = require 'path'
yaml = require 'js-yaml'

task 'run', 'start up development', ->
  invoke 'compile'
  invoke 'concat'
  invoke 'watch'
  invoke 'build'

task 'build', ->
  util.log 'Building extension'
  exec 'make build'

task 'compile', 'compile extension and spec coffee', ->
  util.log "Compiling coffee"
  folders = ['lib', 'views', 'collections', 'modules', 'models', 'workers']
  for folder in folders
    for section in ['extension', 'spec']
      filepath = "#{section}/javascripts/#{folder}/*"
      fs.unlinkSync(filepath) if fs.existsSync(filepath)

  for folder in ['extension', 'spec']
    filepaths = glob.sync("#{folder}/**/*.coffee")
    for filepath in filepaths
      code = fs.readFileSync(filepath).toString()
      jsFilepath = filepath
        .replace('.coffee', '.js')
        .replace('coffeescripts', 'javascripts')
      fs.writeFileSync jsFilepath, coffee.compile(code)

task 'concat', 'concat javascript and templates', ->
  (->
    util.log "Concating templates"
    filepaths = glob.sync("extension/templates/*.html")
    concatedTemplates = ''
    for filepath in filepaths
      key = path.basename(filepath, '.html')
      code = fs.readFileSync(filepath).toString()
      template = code.replace(/\n/g, '').replace(/\"/, '\"')
      concatedTemplates += "BH.Templates.#{key} = \"#{template}\";\n\n"
    filepath = 'extension/javascripts/templates.js'
    fs.writeFileSync filepath, concatedTemplates
  )()

  (->
    util.log "Concating javascript"
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
  )()

task 'watch', 'watch coffee and template files', ->
  for folder in ['extension', 'spec']
    for filepath in glob.sync("#{folder}/**/*.coffee")
      fs.watchFile filepath, {}, ->
        util.log '== Coffee changed'
        invoke 'compile'
        invoke 'concat'
        invoke 'build'

  for filepath in glob.sync("extension/templates/*.html")
    fs.watchFile filepath, {}, ->
      util.log '== Template Changed'
      invoke 'concat'
      invoke 'build'
