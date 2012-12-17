VERSION=$(shell grep -E '"version":.*?[^\\]",' package.json | sed 's/[^0-9\.]//g')

build:
	rm -f extension.zip
	rm -fr build
	mkdir -p build
	mkdir build/javascripts
	mkdir build/javascripts/frameworks
	mkdir build/javascripts/workers
	mkdir build/images
	mkdir build/styles
	mkdir build/_locales
	cp extension/index.html build/
	cp extension/manifest.json build/
	cp -r extension/images/* build/images/
	cp -r extension/_locales/* build/_locales/
	cp extension/javascripts/generated_extension.js build/javascripts/
	cp extension/javascripts/generated_background.js build/javascripts/
	cp extension/javascripts/frameworks/underscore-min.js build/javascripts/frameworks/
	cp extension/javascripts/workers/* build/javascripts/workers/
	cp extension/styles/app.css build/styles/
	cp extension/styles/chrome-bootstrap.css build/styles/
	sed -i '' 's/\$$VERSION\$$/${VERSION}/g' build/manifest.json
	zip -r extension.zip build

.PHONY: build
