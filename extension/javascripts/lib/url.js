Url = {
  base: function() {
    return 'chrome://history/';
  },

  search: function(text) {
    return Url.base() + '#search/'+ text;
  },

  day: function(weekId, id) {
    return '#weeks/' + weekId + '/days/' + id;
  }
};
