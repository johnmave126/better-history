FilterItemView = Backbone.View.extend({
  className: 'filter_item_view selectable',
  tagNase: 'ul',

  initialize: function() {
    this.model.bind('count', this.count, this);
    this.model.bind('change', this.update, this);
  },

  render: function() {
    $(this.el).append(ich.filterItem(this.model.presenter()));
    return this;
  },

  update: function() {
    this.count({count: this.model.get('history').length});
  },

  count: function(count) {
    if(count.count === 0) $('a', this.el).addClass('empty');
  }
});
