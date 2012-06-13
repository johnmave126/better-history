guard 'coffeescript', :output => 'extension/javascripts/' do
  watch('^extension/coffeescripts/(.*)\.coffee')
end

guard 'coffeescript', :output => 'spec/javascripts' do
  watch('^spec/coffeescripts/(.*)\.coffee')
end

guard 'livereload' do
  watch('^spec/javascripts/.+\.js$')
  watch('^extension/javascripts/.+\.js$')
end
