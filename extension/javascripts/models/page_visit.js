PageVisit = Backbone.Model.extend({
  defaults: {
    title: '(No Title)'
  },

  initialize: function() {
    if(this.get('title') === '') {
      this.set({title: this.defaults.title});
    }
  },

  domain: function() {
    var match = this.get('url').match(/\w+:\/\/(.*?)\//);
    return (match === null ? null : match[0]);
  },

  compare: function(aPageVisit) {
    if(this.domain() === null || aPageVisit.domain() === null) {
      return false;
    } else if(this.domain() == aPageVisit.domain()) {
      return true;
    } else {
      return false;
    }
  }
});

PageVisit.search = function(options, callback) {
  chrome.history.search(options, function(results) {
    var items = [];

    $.each(results, function(i, result) {
      if(options.startTime != null && options.endTime != null) {
        if(result.lastVisitTime > options.startTime && result.lastVisitTime < options.endTime) {
          items.push(new PageVisit(result));
        }
      } else {
        items.push(new PageVisit(result));
      }
    });

    callback(items);
  });
};
