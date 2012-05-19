
//BH = {
//  initialize: function() {
//    this.router = new BH.Router();
//    this.models = {
//      settings: new BH.Models.Settings(),
//      version: new BH.Models.Version({version:'1.6.0'}),
//      state: new BH.Models.State(),
//      //searchFilter: new Filter({
//        //id: 'search',
//        //endTime: new Date().getTime(),
//        //startTime: DateRanger.borders(60).start.getTime()
//      //})
//    };
//    this.collections = {
//      weeks: weeks
//    };
//    this.views = {
//      sidebarView: new SidebarView({collection: weeks}),
//      //searchView: new SearchView({model: this.models.searchFilter}),
//      settingsView: new SettingsView({model: this.models.settings}),
//      appView: new AppView({
//        el: $('.app'),
//        model: BH.models.version,
//        collection: weeks
//      }),
//      weekViews: {}
//    };
//
//    var self = this;
//    this.collections.weeks.each(function(model) {
//      self.views.weekViews[model.id] = new WeekView({
//        model: model
//      });
//    });
//
//    this.models.settings.fetch();
//    this.models.state.fetch();
//  }
//};

router = new BH.Router();
