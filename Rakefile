
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'

  task :package do
    exec 'zip -r extension.zip extension/'
  end
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end
