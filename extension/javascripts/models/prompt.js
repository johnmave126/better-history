Prompt = Backbone.Model.extend({
  toTemplate: function() {
    return _.extend(this.toJSON(), i18n.prompt());
  }
});
