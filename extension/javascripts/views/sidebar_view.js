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
    //router.bind('route:filter', function(type) {
      //var filter = filters.getByHash(this.checkType(type));
      //self.select($('a[data-cid=' + filter.cid + ']'));
    //});
  },

  render: function() {
    var self = this;
    $('#sidebarTemplate').tmpl().appendTo(self.el);
    $.each(this.collection.models, function(i, filter) {
      $('#filterItemTemplate').tmpl(filter.toJSONWithCID()).appendTo($('.filters', self.el));
    });
    return this;
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
    $('.item', this.el).removeClass(this.selectedClass);
    $(element).parent().addClass(this.selectedClass);
  }
});
