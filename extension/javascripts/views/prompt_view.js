PromptView = Backbone.View.extend({
  className: 'prompt_view',

  events: {
    'click .no': 'clickedNo',
    'click .yes': 'clickedYes'
  },

  render: function() {
    ich.prompt(this.model.toJSON()).appendTo(this.el);
    return this;
  },

  clickedNo: function(ev) {
    ev.preventDefault();
    this.model.set({action: false});
  },

  clickedYes: function(ev) {
    ev.preventDefault();
    this.model.set({action: true});
  },

  open: function() {
    var self = this;
    $('.overlay', this.el).fadeIn('fast', function() {
      $('.overlay .modal', self.el).fadeIn('fast');
    });
  },

  close: function() {
    var self = this;
    $('.overlay .modal').fadeOut('fast', function() {
      $('.overlay', self.el).fadeOut('fast');
      self.remove();
    });
  }
});
