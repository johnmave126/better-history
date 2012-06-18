def build_templates
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
  puts "Generated templates"
end

guard 'coffeescript', :output => 'extension/javascripts/' do
  watch('^extension/coffeescripts/(.*)\.coffee')
end

guard 'coffeescript', :output => 'spec/javascripts' do
  watch('^spec/coffeescripts/(.*)\.coffee')
end

watch('extension/templates/(.*)\.html') do
  build_templates()
end

build_templates()
