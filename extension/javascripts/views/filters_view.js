FiltersView = Backbone.View.extend({
  tagName: 'ul',
  className: 'nav mainnav',

  events: {
    'click .clear_history': 'clearHistoryClicked',
    'click .item a': 'filterClicked',
    'keyup .search': 'searchTyped'
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
    $('<a href="#" class="clear_history button">Clear all history...</a>').appendTo(this.el);
    return this;
  },

  appendFilter: function(filter) {
    if(filter.get('hash') == 'search') {
      $('#searchFilterItemTemplate').tmpl().appendTo(this.el);
    } else {
      var properties = filter.toJSON();
      properties.cid = filter.cid;
      $('#filterItemTemplate').tmpl(properties).appendTo(this.el);
    }
  },

  clearHistoryClicked: function(ev) {
    ev.preventDefault();
    chrome.tabs.create({url:'chrome://settings/clearBrowserData'});
  },

  filterClicked: function(ev) {
    this.select(ev.currentTarget);
  },

  searchTyped: function(ev) {
    if(ev.keyCode === 13) {
      this.select(null);
      router.search($('.search').val());
    }
  },

  select: function(element) {
    $('.item', this.el).removeClass('selected');
    $(element).parent().addClass('selected');
  }
});
