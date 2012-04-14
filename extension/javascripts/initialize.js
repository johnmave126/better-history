BH = {
  initialize: function() {
    this.router = new Router();
    this.models = {
      settings: new Settings(),
      version: new Version({version:'1.6.0'}),
      state: new State(),
      searchFilter: new Filter({
        id: 'search',
        endTime: new Date().getTime(),
        startTime: DateRanger.borders(60).start.getTime()
      })
    };
    this.collections = {
      filters: DefaultFilters.fetch()
    };
    this.views = {
      sidebarView: new SidebarView({collection: this.collections.filters}),
      searchView: new SearchView({model: this.models.searchFilter}),
      settingsView: new SettingsView({model: this.models.settings}),
      appView: new AppView({
        el: $('.app'),
        model: BH.models.version,
        collection: DefaultFilters.fetch()
      }),
      filterViews: {}
    };

    var self = this;
    this.collections.filters.each(function(filter) {
      self.views.filterViews[filter.id] = new FilterView({model: filter});
    });

    this.models.settings.fetch();
    this.models.state.fetch();
  }
};

BH.initialize();

$(function() {
  BH.views.appView.render();

  if(BH.models.version.get('suppress') === false) {
    var versionView = new VersionView({model: BH.models.version});
    $('body').append(versionView.render().el);
    versionView.open();
  }
  Backbone.history.start();

  if(!location.hash) {
    BH.router.navigate(BH.models.state.get('route'), {trigger: true});
  }
});
