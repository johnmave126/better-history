Backbone.sync = function(method, model, options) {
  if(method === 'delete') {
    chrome.history.deleteUrl({url: model.get('url')});
    options.success(model);
  } else if(method === 'read') {
    chromeAPI.history.search(options.searchOptions, function(visits) {
      if(options.searchOptions.text.length === 0) {
        visits = GroupBy.time(timeGrouping, visits);
      }
      options.success(visits);
    });
  }
};
