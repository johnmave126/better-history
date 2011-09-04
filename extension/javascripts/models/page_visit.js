PageVisit = Backbone.Model.extend({
  defaults: {
    title: '(No Title)'
  },

  initialize: function() {
    if(this.get('title') === '') {
      this.set({title: this.defaults.title});
    }
  },

  presenter: function() {
    var properties = this.toJSON();
    properties.cid = this.cid;
    return properties;
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
  },

  destroy: function() {
    chrome.history.deleteUrl({url: this.get('url')});
  }
});

PageVisit.search = function(options, callback) {
  chrome.history.search(options, function(results) {
    pageVisits = new PageVisits(); // global

    $.each(results, function(i, result) {
      if(options.startTime != null && options.endTime != null) {
        if(result.lastVisitTime > options.startTime && result.lastVisitTime < options.endTime) {
          pageVisits.add(result);
        }
      } else {
        pageVisits.add(result);
      }
    });

    callback(pageVisits);
  });
};
