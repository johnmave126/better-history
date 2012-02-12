var router = new Router(),
    settings = new Settings(),
    version = new Version({version:'1.5.1'});

settings.fetch();

$(function() {
  versionView = new VersionView({model: version});
  creditsView = new CreditsView();

  appView = new AppView({
    el: $('.app'),
    model: versionView.model
  }).render();

  Backbone.history.start();
  if(!location.hash) router.navigate(router.getLastRoute(), {trigger: true});
});
