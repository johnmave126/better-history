Better History
=================

Chrome is an excellent browser. However browsing your history kinda stinks. Let's make it better friend.

Stack
----------------

* [Coffeescript](http://coffeescript.org/) for javascript
* [Jasmine](http://pivotal.github.com/jasmine/) for specs
* [Mustache](http://mustache.github.com/) for templating
* [Chrome bootstrap](https://github.com/roykolak/chrome-bootstrap) for styles

Setup
-----------------

Better History uses Ruby for development setup and compiling. You'll need to run the command below to install the required gems.

    $ bundle install

Start up Guard which will generate coffeescript, templates, and package files when changed locally.

    $ bundle exec guard
