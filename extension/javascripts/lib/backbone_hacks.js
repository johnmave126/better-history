Backbone.View.prototype.template = function(json) {
  return Mustache.render($('#' + this.templateId).html(), json);
};

Backbone.Modal = Backbone.View.extend({
  pulseClass: 'pulse',
  template: function(json) {
    var overlay = $('<div class="overlay" id="overlay" />'),
        self = this;

    $(overlay).click(function() {
      $('.page', this).addClass(self.pulseClass);
    });

    return $(overlay).append(Mustache.render($('#' + this.templateId).html(), json));
  },
  open: function() {
    $('.overlay', this.$el).fadeIn('fast', function() {
      $(this).children().fadeIn('fast');
    });
  },
  close:function() {
    var self = this;
    $('.overlay .modal', this.$el).fadeOut('fast', function() {
      $('.overlay').fadeOut('fast', function() {
        self.remove();
      });
    });
  }
});


_.extend(Backbone.History.prototype, {
  loadUrl: _.wrap(Backbone.History.prototype.loadUrl, function(func) {
    var argsCalledWith = Array.prototype.slice.call(arguments, 1);
    BH.router.trigger('route:before', argsCalledWith);
    arguments[0].apply(this, argsCalledWith);
    BH.router.trigger('route:after', argsCalledWith);
  })
});
