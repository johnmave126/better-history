Backbone.sync = function(method, model, options) {
  if(method === 'delete') {
    chrome.history.deleteUrl({url: model.get('url')});
    options.success(model);
  }
};
