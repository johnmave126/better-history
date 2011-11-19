SettingsView = Backbone.View.extend({
  className: 'settings_view',

  events: {
    'click .clear_history': 'clickedClearHistory',
    'click .release_announcement': 'clickedReleaseAnnouncement',
    'change .time_grouping': 'changedTimeGrouping',
    'change .time_format': 'changedTimeFormat',
    'click .domain_grouping': 'clickedDomainGrouping'
  },

  initialize: function() {
    Helpers.pageTitle('Settings');
    this.model.unbind('change').bind('change', this.saveSettings, this);
  },

  saveSettings: function() {
    this.model.save();
  },

  render: function() {
    var self = this;
    $(this.el).append(ich.settings()).fadeIn('fast', function() {
      $('.time_grouping', this).val(self.model.get('timeGrouping'));
      $('.time_format', this).val(self.model.get('timeFormat'));
      $('.domain_grouping', this).prop('checked', self.model.get('domainGrouping'));
    });
    return this;
  },

  changedTimeGrouping: function(ev) {
    this.model.set({timeGrouping: $(ev.currentTarget).val()});
  },

  changedTimeFormat: function(ev) {
    this.model.set({timeFormat: $(ev.currentTarget).val()});
  },

  clickedDomainGrouping: function(ev) {
    this.model.set({domainGrouping: $(ev.currentTarget).is(':checked')});
  },

  clickedClearHistory: function(ev) {
    ev.preventDefault();
    chrome.tabs.create({url:'chrome://settings/clearBrowserData'});
  },

  clickedReleaseAnnouncement: function(ev) {
    ev.preventDefault();
    versionView.open();
  }
});
