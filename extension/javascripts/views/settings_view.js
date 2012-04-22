SettingsView = Backbone.View.extend({
  className: 'settings_view',
  templateId: 'settings',

  events: {
    'click .clear_history': 'clickedClearHistory',
    'change .time_grouping': 'changedTimeGrouping',
    'change .time_format': 'changedTimeFormat',
    'click .domain_grouping': 'clickedDomainGrouping',
    'click .search_by_domain': 'clickedSearchByDomain',
    'click .search_by_selection': 'clickedSearchBySelection',
    'click .credits': 'clickedCredits',
    'click .release_announcement': 'clickedReleaseAnnouncement'
  },

  initialize: function() {
    Helpers.pageTitle(chrome.i18n.getMessage('settings_title'));
    this.model.off('change');
    this.model.on('change', this.saveSettings, this);
  },

  saveSettings: function() {
    this.model.save();
  },

  render: function() {
    var self = this;
    this.$el.append(this.template(i18n.settings()));
    this.$('.time_grouping').val(self.model.get('timeGrouping'));
    this.$('.time_format').val(self.model.get('timeFormat'));
    this.$('.domain_grouping').prop('checked', self.model.get('domainGrouping'));
    this.$('.search_by_selection').prop('checked', self.model.get('searchBySelection'));
    this.$('.search_by_domain').prop('checked', self.model.get('searchByDomain'));
    this.$('.current_version').text(BH.models.version.get('version'));
    this.renderGooglePlus();
    return this;
  },

  renderGooglePlus: function() {
    window.___gcfg = {lang: chrome.i18n.getMessage('google_plus_language')};
    (function() {
      var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
      po.src = 'https://apis.google.com/js/plusone.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();
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

  clickedSearchByDomain: function(ev) {
    this.model.set({searchByDomain: $(ev.currentTarget).is(':checked')});

    var backgroundPage = chrome.extension.getBackgroundPage(),
        method = (this.model.get('searchByDomain') ? 'create' : 'remove');

    backgroundPage.pageContextMenu[method]();
  },

  clickedSearchBySelection: function(ev) {
    this.model.set({searchBySelection: $(ev.currentTarget).is(':checked')});

    var backgroundPage = chrome.extension.getBackgroundPage(),
        method = (this.model.get('searchBySelection') ? 'create' : 'remove');

    backgroundPage.selectionContextMenu[method]();
  },

  clickedClearHistory: function(ev) {
    ev.preventDefault();
    chrome.tabs.create({url:'chrome://settings/clearBrowserData'});
  },

  clickedCredits: function(ev) {
    ev.preventDefault();
    var creditsView = new CreditsView();
    $('body').append(creditsView.render().el);
    creditsView.open();
  },

  clickedReleaseAnnouncement: function(ev) {
    ev.preventDefault();
    var versionView = new VersionView({model: BH.models.version});
    $('body').append(versionView.render().el);
    versionView.open();
  }
});
