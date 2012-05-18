VersionView = Backbone.Modal.extend({
  className: 'version_view',

  templateId: 'version',

  events: {
    'click .close': 'closeClicked'
  },

  initialize: function() {
    this.attachGeneralEvents();
  },

  render: function() {
    this.$el.html(this.template(this.model.toTemplate()));
    return this;
  },

  closeClicked: function(ev) {
    ev.preventDefault();
    this.model.setSuppress(true);
    this.close();
    BH.router.navigate('#settings');
  },

  openClicked: function(ev) {
    ev.preventDefault();
    this.open();
  }
});
