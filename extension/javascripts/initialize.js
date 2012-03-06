BH = {
  router: new Router(),
  models: {
    settings: new Settings(),
    version: new Version({version:'1.5.1'})
  },
};

BH.models.settings.fetch();

$(function() {
  BH.views = {
    versionView: new VersionView({
      model: BH.models.version
    }),
    creditsView: new CreditsView(),
    appView: new AppView({
      el: $('.app'),
      model: BH.models.version,
      collection: DefaultFilters.fetch()
    })
  };

  BH.views.appView.render();

  Backbone.history.start();
  if(!location.hash) BH.router.navigate(BH.router.getLastRoute(), {trigger: true});
});
