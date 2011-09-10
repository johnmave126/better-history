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
    properties.time = new Date(this.get('lastVisitTime')).toLocaleDateString();
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
  var regExp = new RegExp(options.text, "i");

  var verifyTextMatch = function(result) {
    if(result.url.match(regExp) || result.title.match(regExp)) {
      return true;
    } else {
      return false;
    }
  };

  var verifyDateRange = function(result) {
    return result.lastVisitTime > options.startTime && result.lastVisitTime < options.endTime;
  };

  var isSearchQuery = function() {
    return !(options.startTime && options.endTime);
  };

  chrome.history.search(options, function(results) {
    pageVisits = new PageVisits(); // global
    $.each(results, function(i, result) {
      if (isSearchQuery()){
        if(verifyTextMatch(result)) {
          pageVisits.add(result);
        }
      } else {
        if(verifyDateRange(result)) {
          pageVisits.add(result);
        }
      }
    });

    callback(pageVisits);
  });
};
