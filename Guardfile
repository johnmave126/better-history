def log(message)
  puts(">> #{message}")
end

guard 'coffeescript', :output => 'extension/javascripts/' do
  log('Generating coffeescripts')
  watch('^extension/coffeescripts/(.+\.coffee)')
end

guard 'coffeescript', :output => 'spec/javascripts' do
  log('Generating coffeescript specs')
  watch('^spec/coffeescripts/(.+\.coffee)')
end

watch('extension/templates/(.*)\.html') do
  log('Generating templates and concating js')
  system('rake templates')
  system('rake concat_js')
end

watch('extension/javascripts/frameworks/(.*)\.js') do
  log('Concating js')
  system('rake concat_js')
end

watch('extension/coffeescripts/(.*)\.coffee') do
  log('Concating js')
  system('rake concat_js')
end

system('rake clean_generated_js')
system('rake coffee')
system('rake concat_js')
