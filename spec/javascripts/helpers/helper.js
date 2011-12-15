$.fx.off = true;
jasmine.getFixtures().fixturesPath = 'spec/fixtures';

function insertFixtures(fixtures) {
  loadFixtures(fixtures);
  ich.refresh();
}
function loadChromeAPI(config) {
  chrome = {
    i18n: {
      getMessage: jasmine.createSpy('getMessage').andCallFake(function(key) {
        var lookup = {
          yesterday_link: 'Yesterday',
          today_link: 'Today',
          searching_title: 'Searching',
          and: 'and'
        };

        return lookup[key];
      })
    },
    browserAction: {
      onClicked: {
        addListener: jasmine.createSpy('addListener')
      }
    },
    contextMenus: {
      create: jasmine.createSpy('create').andReturn(true),
      remove: jasmine.createSpy('remove'),
      update: jasmine.createSpy('update')
    },
    tabs: {
      create: jasmine.createSpy('create'),
      get: jasmine.createSpy('get').andCallFake(function(id, callback) {
        callback({url: 'http://' + config.domain + '/projects'});
      }),
      onSelectionChanged: {addListener: jasmine.createSpy('addListener')},
      onUpdated: {addListener: jasmine.createSpy('addListener')}
    }
  };
}
