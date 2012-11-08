Better History
=================

Chrome is an excellent browser. However, browsing your history kinda stinks. Let's make it better.

The Stack
----------------

* Coffeescript for javascript
* Jasmine for specs
* Haml for views
* Mustache for templating
* Chrome bootstrap for styles

Setup
-----------------

Better History uses Ruby for development setup and compiling. So you'll need to run:

    $ bundle install

to install the required gems. After that you can start up Guard via:

    $ bundle exec guard

Guard will do the following for you on change of files:

* compile coffeescript
* generate view templates
* concat js files
