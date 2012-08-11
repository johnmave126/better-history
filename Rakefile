
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
  system('rm -fr extension/javascripts/lib/*')
  system('rm -fr extension/javascripts/views/*')
  system('rm -fr extension/javascripts/collections/*')
  system('rm -fr extension/javascripts/models/*')
  system('rm -fr extension/javascripts/helpers/*')
  system('rm -fr extension/javascripts/workers/*')
  system('rm extension/javascripts/*.js')
end

desc "Package extension into .zip"
task :package do
  Rake::Task['clean_generated_js'].execute
  Rake::Task['coffee'].execute
  system('zip -r -x=extension/coffeescripts/* -x=extension/templates/* -x=spec/* extension.zip extension')
end

desc "Generate coffeeScript"
task :coffee do
  Rake::Task['clean_generated_js'].execute
  system('coffee -c -o extension/javascripts/ extension/coffeescripts/')
  system('coffee -c -o spec/javascripts/ spec/coffeescripts/')
end

desc "Generate templates"
task :templates do
  template_file = ""
  Dir.foreach('extension/templates/') do |file|
    if file.match(/.html$/)
      key = file.gsub(/.html/, '')
      template_content = IO.read("extension/templates/#{file}")
      template_content.gsub!(/\n/, '').gsub!(/\"/, '\"')
      template_file += "BH.Templates.#{key} = '#{template_content}';\n\n"
    end
  end
  File.open('extension/javascripts/templates.js', 'w') {|f| f.write(template_file) }
end

desc "Concat javascript"
task :concat_js do
  require 'yaml'
  packaged = ""
  assets = YAML::load(File.open('extension/coffeescripts/assets.yml'))
  assets.each do |asset|
    packaged += "\n\n// #{asset}.js \n"
    packaged += File.read("extension/javascripts/#{asset}.js")
  end
  system('rm extension/javascripts/package.js')
  File.open("extension/javascripts/package.js", 'w') {|f| f.write(packaged) }
end
