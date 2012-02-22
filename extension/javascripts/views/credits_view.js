CreditsView = Backbone.Modal.extend({
  className: 'credits_view',
  templateId: 'credits',

  events: {
    'click .close': 'closeClicked'
  },

  render: function() {
    this.$el.html(this.template(i18n.credits()));
    return this;
  },

  closeClicked: function(ev) {
    ev.preventDefault();
    this.close();
    BH.router.navigate('#settings');
  },

  openClicked: function(ev) {
    ev.preventDefault();
    this.open();
  } 
});
