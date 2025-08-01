(function ($) {
  var $window = $(window),
    $body = $("body"),
    $wrapper = $("#wrapper");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: [null, "480px"],
  });

  // Hack: Enable IE workarounds.
  if (browser.name == "ie") $body.addClass("ie");

  // Touch?
  if (browser.mobile) $body.addClass("touch");

  // Transitions supported?
  if (browser.canUse("transition")) {
    // Play initial animations on page load.
    $window.on("load", function () {
      window.setTimeout(function () {
        $body.removeClass("is-preload");
      }, 100);
    });

    // Prevent transitions/animations on resize.
    var resizeTimeout;

    $window.on("resize", function () {
      window.clearTimeout(resizeTimeout);

      $body.addClass("is-resizing");

      resizeTimeout = window.setTimeout(function () {
        $body.removeClass("is-resizing");
      }, 100);
    });
  }

  // Scroll back to top.
  $window.scrollTop(0);

  // Panels.
  var $panels = $(".panel");

  $panels.each(function () {
    var $this = $(this),
      $toggles = $('[href="#' + $this.attr("id") + '"]'),
      $closer = $('<div class="closer" />').appendTo($this);

    // Closer.
    $closer.on("click", function (event) {
      $this.trigger("---hide");
    });

    // Events.
    $this
      .on("click", function (event) {
        event.stopPropagation();
      })
      .on("---toggle", function () {
        if ($this.hasClass("active")) $this.triggerHandler("---hide");
        else $this.triggerHandler("---show");
      })
      .on("---show", function () {
        // Hide other content.
        if ($body.hasClass("content-active")) $panels.trigger("---hide");

        // Activate content, toggles.
        $this.addClass("active");
        $toggles.addClass("active");

        // Activate body.
        $body.addClass("content-active");
      })
      .on("---hide", function () {
        // Deactivate content, toggles.
        $this.removeClass("active");
        $toggles.removeClass("active");

        // Deactivate body.
        $body.removeClass("content-active");
      });

    // Toggles.
    $toggles
      .removeAttr("href")
      .css("cursor", "pointer")
      .on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        $this.trigger("---toggle");
      });
  });

  // Global events.
  $body.on("click", function (event) {
    if ($body.hasClass("content-active")) {
      event.preventDefault();
      event.stopPropagation();

      $panels.trigger("---hide");
    }
  });

  $window.on("keyup", function (event) {
    if (event.keyCode == 27 && $body.hasClass("content-active")) {
      event.preventDefault();
      event.stopPropagation();

      $panels.trigger("---hide");
    }
  });

  // Header.
  var $header = $("#header");

  // Links.
  $header.find("a").each(function () {
    var $this = $(this),
      href = $this.attr("href");

    // Internal link? Skip.
    if (!href || href.charAt(0) == "#") return;

    // Redirect on click.
    $this
      .removeAttr("href")
      .css("cursor", "pointer")
      .on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        window.location.href = href;
      });
  });

  // Footer.
  var $footer = $("#footer");

  // Copyright.
  // This basically just moves the copyright line to the end of the *last* sibling of its current parent
  // when the "medium" breakpoint activates, and moves it back when it deactivates.
  $footer.find(".copyright").each(function () {
    var $this = $(this),
      $parent = $this.parent(),
      $lastParent = $parent.parent().children().last();

    breakpoints.on("<=medium", function () {
      $this.appendTo($lastParent);
    });

    breakpoints.on(">medium", function () {
      $this.appendTo($parent);
    });
  });

  // Main.
  var $main = $("#main");

  // Thumbs.
  $main.children(".thumb").each(function () {
    var $this = $(this),
      $image = $this.find(".image"),
      $image_img = $image.children("img"),
      x;

    // No image? Bail.
    if ($image.length == 0) return;

    // Image.
    // This sets the background of the "image" <span> to the image pointed to by its child
    // <img> (which is then hidden). Gives us way more flexibility.

    // Set background.
    $image.css("background-image", "url(" + $image_img.attr("src") + ")");

    // Set background position.
    if ((x = $image_img.data("position"))) $image.css("background-position", x);

    // Hide original img.
    $image_img.hide();
  });

  // Poptrox.
  $main.poptrox({
    baseZIndex: 20000,
    caption: function ($a) {
      var s = "";

      $a.nextAll().each(function () {
        s += this.outerHTML;
      });

      return s;
    },
    fadeSpeed: 300,
    onPopupClose: function () {
      $body.removeClass("modal-active");
    },
    onPopupOpen: function () {
      // Original onPopupOpen function
      $body.addClass("modal-active");

      // Custom code for tap-to-navigate on touch devices
      if (browser.mobile) {
        // Find the main popup container element
        var $popupContainer = $(".poptrox-popup");

        // Check if a click listener is already attached to avoid multiple bindings
        if (!$popupContainer.data("click-handler-attached")) {
          $popupContainer.data("click-handler-attached", true);

          // Add a click handler to the image
          $popupContainer.on("click", function (e) {
            // Prevent the default behavior of closing the popup on a tap
            e.stopPropagation();

            var $this = $(this);
            var imageWidth = $this.width();
            var clickX = e.pageX - $this.offset().left;
            var nextButton = $(".poptrox-next");
            var prevButton = $(".poptrox-prev");

            // Check if the click was on the right half of the image
            if (clickX > imageWidth / 2) {
              if (nextButton.length) {
                nextButton.trigger("click");
              }
            } else {
              // Otherwise, go to the previous image
              if (prevButton.length) {
                prevButton.trigger("click");
              }
            }
          });
        }
      }
    },
    overlayOpacity: 0,
    popupCloserText: "",
    popupHeight: 150,
    popupLoaderText: "",
    popupSpeed: 300,
    popupWidth: 150,
    selector: ".thumb > a.image",
    usePopupCaption: true,
    usePopupCloser: true,
    usePopupDefaultStyling: false,
    usePopupForceClose: true,
    usePopupLoader: true,
    usePopupNav: true,
    windowMargin: 50,
  });

  // Hack: Set margins to 0 when 'xsmall' activates.
  breakpoints.on("<=xsmall", function () {
    $main[0]._poptrox.windowMargin = 0;
  });

  breakpoints.on(">xsmall", function () {
    $main[0]._poptrox.windowMargin = 50;
  });
  // --- Custom Animation Logic for #animateSection --- //

  var $animateSection = $("#animateSection");

  // Check if the section is already visible on page load
  // The template script already runs on page load, so we don't need a DOMContentLoaded listener
  if (
    $animateSection.length &&
    $animateSection.offset().top < $window.scrollTop() + $window.height()
  ) {
    $animateSection.addClass("animate-on-scroll");
  }

  // Set up the IntersectionObserver for elements that aren't initially in the viewport
  var observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass("animate-on-scroll");
          // Stop observing once the animation has been triggered once
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
    }
  );

  // Start observing the target element
  if ($animateSection.length) {
    observer.observe($animateSection[0]);
  }

  // --- End of Custom Animation Logic --- //
})(jQuery);
