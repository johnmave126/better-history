CreditsView = Backbone.View.extend({
  className: 'credits_view',

  events: {
    'click .close': 'closeClicked'
  },

  render: function() {
    ich.credits().appendTo(this.el);
    return this;
  },

  closeClicked: function(ev) {
    ev.preventDefault();
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
