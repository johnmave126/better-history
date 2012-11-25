var mockChromeAPI = function() {
  return {
    i18n: {
      getMessage: jasmine.createSpy("getMessage").andCallFake(function(key) {
        return '[translated ' + key + ']';
      })
    },
    history: {
      search: jasmine.createSpy("search"),
      deleteRange: jasmine.createSpy("deleteRange")
    },
    browserAction: {
      onClicked: {
        addListener: jasmine.createSpy("addListener")
      }
    },
    contextMenus: {
      create: jasmine.createSpy("create").andReturn(true),
      remove: jasmine.createSpy("remove"),
      update: jasmine.createSpy("update"),
      onClicked: {
        addListener: jasmine.createSpy("addListener")
      }
    },
    tabs: {
      create: jasmine.createSpy("create"),
      get: jasmine.createSpy("get").andCallFake(function(id, callback) {
        return callback({
          url: "http://code.google.com/projects"
        });
      }),
      onSelectionChanged: {
        addListener: jasmine.createSpy("addListener")
      },
      onUpdated: {
        addListener: jasmine.createSpy("addListener")
      }
    }
  };
};
