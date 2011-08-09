FiltersView = Backbone.View.extend({
  tagName: 'ul',
  className: 'nav mainnav',

  events: {
    'click a': 'select'
  },

  render: function() {
    var self = this;
    $.each(this.collection.models, function(i, filter) {
      self.appendFilter(filter);
    });
    return this;
  },

  appendFilter: function(filter) {
    $(this.el).append('<li class="item"> <a href="#' + filter.get('hash') + '" data-cid="' + filter.cid + '">' + filter.get('name') + '</a></li>');
  },

  select: function(ev) {
    element = ev.currentTarget;
    $('.item', this.el).removeClass('selected');
    $(element).parent().addClass('selected');
    this.loadFilterView(element);
  },

  loadFilterView: function(element) {
    var filterView = new FilterView({
      model: this.collection.getByCid($(element).attr('data-cid')),
      el: $('.mainview')
    });
    filterView.render();
  }
});
