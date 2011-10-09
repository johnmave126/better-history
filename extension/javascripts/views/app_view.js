AppView = Backbone.View.extend({

  events: {
    'click .close': 'modalCloseClicked'
  },

  render: function() {
    $('#appTemplate').tmpl({
      title: '<em>Better</em> History reaches 1.0!',
      content: '<p>It\'s been a fast paced couple of months, but <strong><em>Better</em> History</strong> 1.0 is all ready for you. Thanks for using this extension, enjoy friends.</p><h4>What\'s new</h4><ul><li>More day filters in the left sidebar</li><li>Smoother animations</li><li>Expand/collapse all time intervals for day filters</li><li>Remembers what times are expanded/collapsed</li><li>Easier deleting of visits (No more dragging!)</li><li>Smarter behavior for days w/ no visits</li></ul><h4>Comments? Suggestions? Bugs? <a href="http://twitter.com/roykolak">@roykolak</a></h4>'
    }).appendTo(this.el);

    var sidebarView = new SidebarView({collection: filters});

    $('.navbar', this.el).append(sidebarView.render().el).fadeIn(200);

    return this;
  },

  modalCloseClicked: function() {
    var self = this;
    $('.overlay .modal').fadeOut('fast', function() {
      $('.overlay', self.el).fadeOut('fast');
    });
  },

  modalOpenClicked: function() {
    var self = this;
    $('.overlay').fadeIn('fast', function() {
      $('.overlay .modal', self.el).fadeIn('fast');
    });
  }
});
