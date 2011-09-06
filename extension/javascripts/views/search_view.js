SearchView = Backbone.View.extend({
  className: 'search_view',

  render: function() {
    $('#searchTemplate').tmpl(this.model.presenter()).appendTo(this.el);
    $('.spinner').spin();

    var self = this;
    PageVisit.search(self.model.options(), function(pageVisits) {
      $('.content', self.el).fadeOut(200, function() {
        $(this).html('');
        if(pageVisits.length === 0) {
          self.renderNoResults();
        } else {
          self.renderPageVisits(pageVisits);
        }
        router.presentContent(self.el);
      });
    });
    return this;
  },

  renderNoResults: function () {
    $('#noVisitsTemplate').tmpl().appendTo($('.content', this.el));
  },

  renderPageVisits: function(pageVisits) {
    var self = this;
    $.each(pageVisits.models, function(i, pageVisit) {
      var pageVisitView = new PageVisitView({model: pageVisit});
      $('.content', self.el).append(pageVisitView.render().el);
    });
  }
});
