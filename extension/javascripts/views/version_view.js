VersionView = Backbone.View.extend({
  className: 'version_view',

  events: {
    'click .close': 'closeClicked'
  },

  render: function() {
    var templateOptions = $.extend(this.model.presenter(), i18n.version());
    ich.version(templateOptions).appendTo(this.el);
    return this;
  },

  closeClicked: function(ev) {
    ev.preventDefault();
    this.model.setSuppress(true);
    this.close();
    router.navigate('#settings');
  },

  openClicked: function(ev) {
    ev.preventDefault();
    this.open();
  },

  open: function() {
    $('.modal').hide();
    var self = this;
    $('.overlay', this.el).fadeIn('fast', function() {
      $('.overlay .modal', self.el).fadeIn('fast');
    });
  },

  close: function() {
    var self = this;
    $('.overlay .modal').fadeOut('fast', function() {
      $('.overlay').fadeOut('fast');
    });
  }
});
