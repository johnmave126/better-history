
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

desc "Package extension into .zip"
task :package do
  system('zip -r -x=extension/coffeescripts/* extension.zip extension')
end

desc "Generate coffeeScript"
task :coffee do
  system('coffee -c -o extension/javascripts/ extension/coffeescripts/')
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
