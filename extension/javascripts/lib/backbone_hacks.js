Backbone.View.prototype.template = function(json) {
  return Mustache.render($('#' + this.templateId).html(), json);
};

Backbone.Modal = Backbone.View.extend({
  open: function() {
    $('.overlay', this.$el).fadeIn('fast', function() {
      $(this).children().fadeIn('fast');
    });
  },
  close:function() {
    $('.overlay .modal', this.$el).fadeOut('fast', function() {
      $('.overlay').fadeOut('fast');
    });
  }
});
