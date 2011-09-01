SidebarView = Backbone.View.extend({
  tagName: 'div',
  className: 'sidebar_view',

  selectedClass: 'selected',

  events: {
    'click .clear_history': 'clearHistoryClicked',
    'click .filter a': 'filterClicked',
    'keyup .search': 'searchTyped'
  },

  initialize: function() {
    var self = this;
    router.bind('route:filter', function(type) {
      self.loadFromType(this.checkType(type));
    });
  },

  loadFromType: function(type) {
    var filter = filters.getByHash(type);
    this.selectFilter($('a[data-cid=' + filter.cid + ']'));
  },

  render: function() {
    var self = this;
    $('#sidebarTemplate').tmpl().appendTo(self.el);
    $.each(this.collection.models, function(i, filter) {
      var properties = filter.toJSONWithCID();
      properties.opacity = i;
      $('#filterItemTemplate').tmpl(properties).appendTo($('.filters', self.el));
    });
    return this;
  },

  clearHistoryClicked: function(ev) {
    ev.preventDefault();
    chrome.tabs.create({url:'chrome://settings/clearBrowserData'});
  },

  filterClicked: function(ev) {
    this.selectFilter(ev.currentTarget);
  },

  searchTyped: function(ev) {
    if(ev.keyCode === 13) {
      this.selectFilter(null);
      router.search($('.search').val());
    }
  },

  selectFilter: function(element) {
    $('.filter', this.el).removeClass(this.selectedClass);
    $(element).parent().addClass(this.selectedClass);
  }
});
