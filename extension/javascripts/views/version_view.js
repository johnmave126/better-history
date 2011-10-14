VersionView = Backbone.View.extend({
  className: 'version_view',

  events: {
    'click .close': 'closeClicked',
    'click .open': 'openClicked'
  },

  render: function() {
    $('#versionTemplate').tmpl(this.model.presenter()).appendTo(this.el);
    return this;
  },

  closeClicked: function(ev) {
    ev.preventDefault();
    this.model.setSuppress(true);
    this.close();
  },

  openClicked: function(ev) {
    ev.preventDefault();
    this.open();
  },

  open: function() {
    var self = this;
    $('.overlay').fadeIn('fast', function() {
      $('.overlay .modal', self.el).fadeIn('fast');
    });
  },

  close: function() {
    var self = this;
    $('.overlay .modal').fadeOut('fast', function() {
      $('.overlay', self.el).fadeOut('fast');
    });
  }
});
