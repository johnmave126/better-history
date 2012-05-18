back = function(date) {
  if(date.format('dddd') !== 'Monday') {
    return back(date.subtract('days', 1));
  }else{
    return date;
  }
};

start = back(moment());
var weeks = new Weeks([
  {date: start},
  {date: moment(start).subtract('weeks', 1)},
  {date: moment(start).subtract('weeks', 2)},
  {date: moment(start).subtract('weeks', 3)},
  {date: moment(start).subtract('weeks', 4)},
  {date: moment(start).subtract('weeks', 5)},
  {date: moment(start).subtract('weeks', 6)},
  {date: moment(start).subtract('weeks', 7)},
  {date: moment(start).subtract('weeks', 8)},
  {date: moment(start).subtract('weeks', 9)}
]);

BH = {
  initialize: function() {
    this.router = new Router();
    this.models = {
      settings: new Settings(),
      version: new Version({version:'1.6.0'}),
      state: new State(),
      //searchFilter: new Filter({
        //id: 'search',
        //endTime: new Date().getTime(),
        //startTime: DateRanger.borders(60).start.getTime()
      //})
    };
    this.collections = {
      weeks: weeks
    };
    this.views = {
      sidebarView: new SidebarView({collection: weeks}),
      //searchView: new SearchView({model: this.models.searchFilter}),
      settingsView: new SettingsView({model: this.models.settings}),
      appView: new AppView({
        el: $('.app'),
        model: BH.models.version,
        collection: weeks
      }),
      weekViews: {}
    };

    var self = this;
    this.collections.weeks.each(function(model) {
      self.views.weekViews[model.id] = new WeekView({
        model: model
      });
    });

    this.models.settings.fetch();
    this.models.state.fetch();
  }
};

BH.initialize();

$(function() {
  BH.views.appView.render();

  if(BH.models.version.get('suppress') === false) {
    var versionView = new VersionView({
      model: BH.models.version
    });
    $('body').append(versionView.render().el);
    versionView.open();
  }
  Backbone.history.start();

  if(!location.hash) {
    BH.router.navigate(BH.models.state.get('route'), {trigger: true});
  }
});
