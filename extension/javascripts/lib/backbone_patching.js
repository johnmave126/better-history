Backbone.sync = function(method, model, options) {
  if(method === 'delete') {
    chrome.history.deleteUrl({url: model.get('url')});
    options.success(model);
  } else if(method === 'read') {
    chromeAPI.history.search(model.options(), function(visits) {
      if(model.get('timeGrouping') !== 0) {
        visits = GroupBy.time(model.get('timeGrouping'), visits);
      }
      options.success(visits);
    });
  }
};
