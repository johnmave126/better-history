$.fx.off = true;

function insertFixtures(fixtures) {
  loadFixtures(fixtures);
  ich.refresh();
}
function loadChromeAPI(config) {
  chrome = {
    i18n: {
      getMessage: jasmine.createSpy('getMessage').andCallFake(function(key, substitutions) {
        var lookup = {
          yesterday_link: 'Yesterday',
          today_link: 'Today',
          searching_title: 'Searching',
          and: 'and',
          formal_date: 'formal date',
          ordinal_1: '1 ordinal',
          informal_date: 'informal date',
          default_time_format: '12',
          number_of_visits: '1 visits',
          morning: 'AM',
          afternoon: 'afternoon PM',
          evening: 'evening PM',
          search_in_history: 'Search in history',
          visits_to_domain: 'Visits to domain', 
          twelve_hour_time_format: '$time$ $label$',
          thursday: 'Thursday',
          tuesday: 'Tuesday',
          october: 'October',
          friday: 'Friday',
          july: 'July',
          september: 'September',
          sunday: 'Sunday',
          december: 'December',
          extended_formal_date: '$weekday$, $month$ $day$, $year$'
        };

        var result = lookup[key];

        $(substitutions).each(function() {
          result = result.replace(/\$\w+\$/, this);
        });

        return result;
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
