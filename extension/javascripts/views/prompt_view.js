PromptView = Backbone.Modal.extend({
  className: 'prompt_view',

  templateId: 'prompt',

  events: {
    'click .no': 'clickedNo',
    'click .yes': 'clickedYes'
  },

  render: function() {
    this.$el.html(this.template(this.model.toTemplate()));
    return this;
  },

  clickedNo: function(ev) {
    ev.preventDefault();
    this.model.set({action: false});
  },

  clickedYes: function(ev) {
    ev.preventDefault();
    this.model.set({action: true});
  }
});

CreatePrompt = function(content) {
  var view = new PromptView({
    model: new Prompt({content: content})
  });
  $('body').append(view.render().el);
  return view;
};
