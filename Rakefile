
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

desc "Clean generated javascript"
task :clean_generated_js do
  folders = [
    'lib',
    'views',
    'collections',
    'models',
    'helpers',
    'workers'
  ]
  folders.each do |folder|
    system("rm -fr extension/javascripts/#{folder}/*")
    system("rm -fr spec/javascripts/#{folder}/*")
  end

  system('rm extension/javascripts/*.js')
end

desc "Package extension into .zip"
task :package do
  Rake::Task['clean_generated_js'].execute
  Rake::Task['coffee'].execute
  Rake::Task['templates'].execute
  Rake::Task['concat_js'].execute
  system('rm extension.zip')
  system('mkdir tmp')
  system('mkdir tmp/javascripts')
  system('mkdir tmp/javascripts/frameworks')
  system('mkdir tmp/javascripts/workers')
  system('mkdir tmp/images')
  system('mkdir tmp/styles')
  system('mkdir tmp/_locales')
  system('cp extension/index.html tmp/')
  system('cp extension/manifest.json tmp/')
  system('cp -r extension/images/* tmp/images/')
  system('cp -r extension/_locales/* tmp/_locales/')
  system('cp extension/javascripts/main.js tmp/javascripts/')
  system('cp extension/javascripts/background.js tmp/javascripts/')
  system('cp extension/javascripts/frameworks/underscore-min.js tmp/javascripts/frameworks/')
  system('cp extension/javascripts/workers/* tmp/javascripts/workers/')
  system('cp extension/styles/app.css tmp/styles/')
  system('cp extension/styles/chrome-bootstrap.css tmp/styles/')
  system('zip -r extension.zip tmp')
  system('rm -fr tmp')
end

desc "Generate coffeescript"
task :coffee do
  Rake::Task['clean_generated_js'].execute
  system('coffee -c -o extension/javascripts/ extension/coffeescripts/')
  system('coffee -c -o spec/javascripts/ spec/coffeescripts/')
end

desc "Generate templates"
task :templates do
  require 'haml'

  template_file = ""
  Dir.foreach('extension/templates/') do |file|
    puts file
    if file.match(/.haml$/)
      key = file.gsub(/.haml/, '')
      haml_content = IO.read("extension/templates/#{file}")
      html_content = Haml::Engine.new(haml_content).render
      html_content.gsub!(/\n/, '')
      template_file += "BH.Templates.#{key} = \"#{html_content}\";\n\n"
    end
  end

  File.open('extension/javascripts/templates.js', 'w') do |f|
    f.write(template_file)
  end
end

desc "Concat javascript"
task :concat_js do
  require 'yaml'
  Rake::Task['templates'].execute
  assets = YAML::load(File.open('extension/coffeescripts/assets.yml'))

  ['main', 'background'].each do |section|
    system("rm extension/javascripts/#{section}.js")
    packaged = ""
    assets[section].each do |asset|
      packaged += "\n\n// #{asset}.js \n"
      packaged += File.read("extension/javascripts/#{asset}.js")
    end

    File.open("extension/javascripts/#{section}.js", 'w') do |f|
      f.write(packaged)
    end
  end
end
