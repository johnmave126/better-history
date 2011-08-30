
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'

  task :package do
    exec 'zip -r extension.zip extension/'
  end

  task :seed do
    File.open('extension/history.html') do |file|

    end

    Dir["spec/javascripts/fixtures/*.html"].each do |file_name|
      content = '';
      File.open(file_name, 'r') do |file|
        file.each do |line|
          content += line
        end
      end
    end
  end
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end
