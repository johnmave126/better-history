(function ($) {
    $.fn.stickyElements = function (options, callback) {
        var settings = $.extend({
            stickyClass: 'header',
            padding: 0
        }, options);

        return $(this).each(function () {

            var container = $(this);
            var header = $('.' + settings.stickyClass, container);
            var originalCss = {
                position: header.css('position'),
                top: header.css('top'),
                width: header.css('width')
            };

            var originalWidth = header.outerWidth(),
                placeholder, headerOrigin, headerHeight, containerHeight, containerTop, containerSize, pageOffset, containerBottom;

            $(window).scroll(function (ev) {
                containerTop = container.offset().top;
                headerOrigin = header.offset().top;
                headerHeight = header.outerHeight();
                containerHeight = container.outerHeight();
                containerTop = container.offset().top;
                containerSize = container.outerHeight();
                pageOffset = $(window).scrollTop() + settings.padding;
                containerBottom = containerHeight + containerTop;

                if(!header.parent('.state').hasClass('collapsed')) {
                  if (pageOffset < containerTop && placeholder != undefined) {
                      if (placeholder != undefined) {
                          placeholder.remove();
                          placeholder = undefined;
                          header.css(originalCss);
                          header.removeClass('stuck');
                      }
                  }
                  else if (pageOffset > containerTop && pageOffset < (containerBottom - headerHeight) && $(window).scrollTop() > 0) {
                      if (placeholder == undefined) {
                          placeholder = $('<div/>')
                          .css('height', header.outerHeight() + 'px')
                          .addClass('placeholder')
                          .css('width', '100%');
                          header.before(placeholder);
                          header.css('width', '100%');
                          header.addClass('stuck');
                      }
                      callback(header);
                      header.css('position', 'fixed');
                      header.css('top', settings.padding + 'px');
                  }
                  else if (pageOffset > (containerBottom - headerHeight)) {
                      header.css('top', (containerBottom - headerHeight) - pageOffset + settings.padding + 'px');
                  }
                }
            });
        });
    }
})(jQuery);
