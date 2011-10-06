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
  }
});

PageVisit.search = function(options, callback) {
  pageVisits = new PageVisits(); // global
  chromeAPI.history.search(options, function(results) {
    $.each(results, function(i) {
      pageVisits.add(results[i]);
    });
    callback(pageVisits);
  });
};
