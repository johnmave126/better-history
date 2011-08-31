
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'

  task :package do
    exec 'zip -r extension.zip extension/'
  end

  task :seed do
    content = ''
    File.open('extension/history.html', 'r') do |file|
      file.each do |line|
        content += line
      end
    end

    fixtures = '';
    Dir["spec/javascripts/fixtures/*.html"].each do |file_name|
      File.open(file_name, 'r') do |file|
        file.each do |line|
          fixtures += "    #{line}"
        end
        fixtures += "\n"
      end
    end
    File.open('extension/history.html', 'w') {|f| f.write(content.gsub(/<!-- Templates Start -->(.*)<!-- Templates End -->/m, "<!-- Templates Start -->\n\n\n#{fixtures}\n    <!-- Templates End -->"))}
  end
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end
