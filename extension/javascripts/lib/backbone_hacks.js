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

    $(overlay)
      .append(Mustache.render($('#' + this.templateId).html(), json))
      .find('.modal').append($('<img src="images/logo.png" />'));

    return overlay;
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

Backbone.ViewWithSearch = Backbone.View.extend({
  applySearchBehavior: function() {
    this.events = _.extend(this.events, {
      'keyup .search': 'searchTyped',
      'blur .search': 'searchBlurred'
    });
  },

  searchTyped: function(ev) {
    var term = this._trimedSearchTerm();
    if(ev.keyCode === 13 && term !== '') {
      BH.router.navigate('search/' + term, true);
    }
  },

  searchBlurred: function() {
    $('.search').val(this._trimedSearchTerm());
  },

  _trimedSearchTerm: function() {
    return $.trim(this.$('.search').val());
  }
});

_.extend(Backbone.Model.prototype, {
  sync: _.wrap(Backbone.Model.prototype.sync, function(func) {
    var args = Array.prototype.slice.call(arguments, 1);
    if(this.storeName) {
      if(args[0] == 'read') {
        if(localStorage[this.storeName]) {
          args[2].success(localStorage[this.storeName]);
        }
      } else if(args[0] == 'create') {
        localStorage[this.storeName] = JSON.stringify(this);
      }
    } else {
      arguments[0].apply(this, argsCalledWith);
    }
  })
});

_.extend(Backbone.History.prototype, {
  loadUrl: _.wrap(Backbone.History.prototype.loadUrl, function(func) {
    var argsCalledWith = Array.prototype.slice.call(arguments, 1);
    BH.router.trigger('route:before', argsCalledWith);
    arguments[0].apply(this, argsCalledWith);
    BH.router.trigger('route:after', argsCalledWith);
  })
});
