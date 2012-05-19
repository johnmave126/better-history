Backbone.View.prototype.template = function(json) {
  return Mustache.render($('#' + this.templateId).html(), json);
};

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
      router.navigate('search/' + term, true);
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
      arguments[0].apply(this, args);
    }
  })
});
