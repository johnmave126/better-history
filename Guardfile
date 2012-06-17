guard 'coffeescript', :output => 'extension/javascripts/' do
  watch('^extension/coffeescripts/(.*)\.coffee')
end

guard 'coffeescript', :output => 'spec/javascripts' do
  watch('^spec/coffeescripts/(.*)\.coffee')
end

watch('extension/templates/(.*)\.html') do
  puts 'regen'
end
