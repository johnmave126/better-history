HistoryItem = function(item) {
  var defaultTitle = '(No title)';
  var title = (item.title === '' ? defaultTitle : item.title);
  return {
    title: title,
    url: item.url,
    lastVisitTime: item.lastVisitTime,
    defaultTitle: defaultTitle,

    domain: function() {
      var match = this.url.match(/\w+:\/\/(.*?)\//);
      return (match === null ? null : match[0]);
    }
  };
};

HistoryItem.search = function(options, callback) {
  chrome.history.search(options, function(results) {
    var items = [];

    $.each(results, function(i, result) {
      if(result.lastVisitTime > options.startTime && result.lastVisitTime < options.endTime) {
        items.push(new HistoryItem(result));
      }
    });

    callback(items);
  });
};
