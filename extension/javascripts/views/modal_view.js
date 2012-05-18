Backbone.Modal = Backbone.View.extend({
  pulseClass: 'pulse',

  generalEvents: {
    'click .close-button': 'close',
    'click .overlay': 'pulse'
  },

  attachGeneralEvents: function() {
    _.extend(this.events, this.generalEvents);
  },

  template: function(json) {
    var overlay = $($('#modal').html());

    $('.page', overlay).append(Mustache.render($('#' + this.templateId).html(), json));

    return overlay;
  },

  open: function() {
    this._globalBinds();
    $('.overlay', this.$el).fadeIn('fast', function() {
      $(this).children().fadeIn('fast', function() {
        $(window).trigger('resize');
      });
    });
  },

  pulse: function() {
    this.$('.page').addClass('pulse');
  },

  close:function() {
    var self = this;
    self.trigger('close');
    this.$('.overlay').fadeOut('fast', function() {
      self.remove();
      self._globalUnbinds();
    });
  },

  _globalBinds: function() {
    $(window).resize(this._updateHeight);
    $(window).keydown($.proxy(this._closeOnEscape, this));
  },

  _globalUnbinds: function() {
    $(window).unbind('resize');
    $(document).unbind('keydown');
  },

  _updateHeight: function() {
    this.$('.page').css({
      maxHeight: Math.min(0.9 * window.innerHeight, 640)
    });
  },

  _closeOnEscape: function(e) {
    if (e.keyCode == 27) {
      this.close();
    }
  }
});
