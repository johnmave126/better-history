SettingsView = Backbone.View.extend({
  className: 'settings_view',

  events: {
    'click .clear_history': 'clearHistoryClicked'
  },

  render: function() {
    $(this.el).append(ich.settings()).fadeIn('fast');
    return this;
  },

  clearHistoryClicked: function(ev) {
    ev.preventDefault();
    chrome.tabs.create({url:'chrome://settings/clearBrowserData'});
  }
});
