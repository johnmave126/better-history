BH = {
  initialize: function() {
    this.router = new Router();
    this.models = {
      settings: new Settings(),
      version: new Version({version:'1.5.1'}),
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
  }
};

BH.initialize();

$(function() {
  BH.views.appView.render();

  Backbone.history.start();

  if(!location.hash) {
    BH.router.navigate(BH.router.getLastRoute(), {trigger: true});
  }
});
