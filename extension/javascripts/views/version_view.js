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
  },

  openClicked: function(ev) {
    ev.preventDefault();
    this.open();
  },

  open: function() {
    var self = this;
    $('.overlay', this.el).fadeIn('fast', function() {
      $('.overlay .modal', self.el).fadeIn('fast');
    });
  },

  close: function() {
    var self = this;
    $('.overlay .modal', this.el).fadeOut('fast', function() {
      $('.overlay', self.el).fadeOut('fast');
    });
  }
});
