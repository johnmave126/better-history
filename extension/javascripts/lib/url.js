Url = {
  base: function() {
    return 'chrome://history/';
  },

  search: function(text) {
    return Url.base() + '#search/'+ text;
  }
}
