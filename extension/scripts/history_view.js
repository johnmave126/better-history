function HistoryView() {
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

  function stickHeaders(container) {
    $(container).find('section').stickySectionHeaders({
      stickyClass:'date_interval', padding:48
    });
    $(container).find('section > div').stickySectionHeaders({
      stickyClass:'time_interval', padding:48
    });
    $(window).scrollTop(40);
  }

  return {
    load: function(filter, options) {
      var self = this;
      transitionViews(filter, function() {
        HistoryItem.search(options, function(results) {
          self.render(groupResults(results), selector(filter));
        });
      });
    },

    render: function(results, container) {
      $(container).html('');
      for(date in results) {
        var dateSection = $('#dateTemplate').tmpl({date:date});
        for(time in results[date]) {
          if(results[date].hasOwnProperty(time)) {
            var timeSection = $('#timeTemplate').tmpl({time:time}).appendTo(dateSection);
            $.each(results[date][time], function(i, historyItem) {
              if(isArray(historyItem)) {
                var historyItems = historyItem;
                $('#combineVisitsTemplate').tmpl({
                  url: historyItems[0].url,
                  amount: historyItems.length,
                  domain: historyItems[0].domain()
                }).appendTo(timeSection);

                var expandedVisits = $('#expandedVisitsTemplate').tmpl({});
                $.each(historyItems, function(i, historyItem) {
                  $('#pageVisitTemplate').tmpl(historyItem).appendTo(expandedVisits);
                });
                $(timeSection).append(expandedVisits);
              } else {
                $('#pageVisitTemplate').tmpl(historyItem).appendTo(timeSection);
              }
            });
            $(container).append(dateSection);
            $('.expand').unbind('click').click(function(ev) {
              ev.preventDefault();
              var element = ev.target;
              if($(element).hasClass('active')) {
                $(element).text('Expand');
                $(element).parents('.page').next().slideUp('fast');
              } else {
                $(element).text('Collapse');
                $(element).parents('.page').next().slideDown('fast');
              }
              $(element).toggleClass('active');
            });
          }
        }
      }
      stickHeaders(container);
    }
  }
};
