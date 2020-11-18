(function($, Drupal) {
  /**
   * Sticky header
   */
  Drupal.behaviors.stickyHeader = {
    attach: function(context, settings) {
      var stickyTop;
      var headerWidth;
      var headerHeight;
      var windowTop;
      var currentPosition;
      var $header;
      var topSpacing;

      $header = $('#navbar');

      $(document).ready(delaySticky);
      $(window).on("resize mresize", delaySticky);

      function delaySticky() {
        setTimeout(function sticky() {
          if ($('sticky-header')) {
            $header.removeClass('sticky-header');
          }
          topSpacing = ((isNaN($('.toolbar-fixed #toolbar-bar').height())) ? 0 : $('#toolbar-bar').height()) + ((isNaN($('.toolbar-tray-horizontal.is-active').height())) ? 0 : $('.toolbar-tray-horizontal.is-active').height());
          // headerWidth = $header.width(); // gets the width of the container
          headerHeight = $header.height(); // gets the height of our header
          $(".header-container").css("height", headerHeight);
          $header.css({
            // width: "initial",
          });

          // headerHeight = $header.height(); // gets the height of our header

          stickyTop = $header.offset().top; // tells how far our target element is from the top of the page
          windowTop = $(window).scrollTop(); // tells how far our screen is currently from the top of the page
          currentPosition = stickyTop - windowTop - topSpacing + headerHeight; // tells how far our target element is from where our screen is currently

          // console.log('Distance from top of page: ' + stickyTop);
          // console.log('Position on load ' + currentPosition);


          if (currentPosition < 0) { // if target element goes above the screen
            $header.addClass('sticky-header');
            $header.css("top", topSpacing);
            $header.slideDown();
          } else {
            $header.removeClass('sticky-header');
            $header.css("top", "");
          }
          // console.log("Top spacing is " + topSpacing);
        }, 500);
      }

      $(window).scroll(function() { // scroll event 
        windowTop = $(window).scrollTop(); // tells how far our screen is currently from the top of the page
        currentPosition = stickyTop - windowTop - topSpacing + headerHeight; // tells how far our target element is from where our screen is currently

        // console.log('Distance from top of page: ' + stickyTop);
        // console.log('Current position: ' + currentPosition);

        if (currentPosition < 0) { // if target element goes above the screen
          $header.addClass('sticky-header');
          $header.css("top", topSpacing);
        } else if (currentPosition >= 0) {
          $header.removeClass('sticky-header');
          $header.css("top", "");
        }
        // console.log("Top spacing is " + topSpacing);
      });
    }
  };

  /**
   * Sticky header
   */
  Drupal.behaviors.activeli = {
    attach: function(context, settings) {
      if ($('.menu a.is-active')) {
        $(this).parent().addClass('active'); 
      }
    }
  };  

})(jQuery, Drupal);
