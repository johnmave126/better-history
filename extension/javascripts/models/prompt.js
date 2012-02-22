Prompt = Backbone.Model.extend({
  toTemplate: function() {
    return $.extend(this.toJSON(), i18n.prompt());
  }
});
