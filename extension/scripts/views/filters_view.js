FiltersView = Backbone.View.extend({
  tagName: 'ul',
  className: 'nav mainnav',

  events: {
    'click a': 'filterClicked'
  },

  initialize: function() {
    var self = this;
    router.bind('route:filter', function(type) {
      var filter = filters.getByHash(this.checkType(type));
      self.select($('a[data-cid=' + filter.cid + ']'));
    });
  },

  render: function() {
    var self = this;
    $.each(this.collection.models, function(i, filter) {
      self.appendFilter(filter);
    });
    return this;
  },

  appendFilter: function(filter) {
    var properties = filter.toJSON();
    properties.cid = filter.cid;
    $('#filterItemTemplate').tmpl(properties).appendTo(this.el);
  },

  filterClicked: function(ev) {
    this.select(ev.currentTarget);
  },

  select: function(element) {
    $('.item', this.el).removeClass('selected');
    $(element).parent().addClass('selected');
  }

});
