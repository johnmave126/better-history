function HistoryView() {
  var chromeHistory = new ChromeHistory();

  function transitionViews(filter, callback) {
    $('.views').fadeOut("fast", function() {
      $('.view').hide();
      $('.views').show();
      $('#' + filter).show();
      callback();
    });
  }

  function selector(filter) {
    return '#' + filter + ' .content';
  }

  return {
    load: function(filter, options) {
      var self = this;
      transitionViews(filter, function() {
        chromeHistory.search(options, function(results) {
          self.render(results, selector(filter));
        });
      });
    },
    render: function(results, container) {
      $(container).html('');
      for(date in results) {
        var dateSection = $('#dateTemplate').tmpl({date:date});
        for(time in results[date]) {
          var timeSection = $('#timeTemplate').tmpl({time:time}).appendTo(dateSection);
          $.each(results[date][time], function(i, visit) {
            if(visit.title == '') {
              visit.title = '(No Title)';
            }
            $('#pageVisitTemplate').tmpl(visit).appendTo(timeSection);
          });
          $(container).append(dateSection);
        }
      }
      $(container).find('section').stickySectionHeaders({stickyClass:'date_interval', padding:48});
      $(container).find('section > div').stickySectionHeaders({stickyClass:'time_interval', padding:48});
      $(window).scrollTop(40);
    }
  }
};
