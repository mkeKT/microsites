/** A parameter-less function to call after module scripts are loaded
 * @name SimpleCallback
 */
/** Register JavaScript modules by loading their external .js files.
 * @param {string[]} scriptPaths - An array of relative or fully-qualified JavaScript files to load
 * @param {SimpleCallback} [callback] - The function to call once all module scripts have loaded
 */
NWS.initNamespace("NWS.Modules.Register", function () {
  return (function (scriptPaths, callback) {
    if (!Array.isArray(scriptPaths)) {
      alert("Must provide an array of module script paths");
      return;
    }

    var completed = [],
      loadScriptFile = function (path, onComplete) {
        var pathLower = path.toLowerCase(),
          head = document.getElementsByTagName("head")[0],
          scripts = head.getElementsByTagName("script");

        for (var s = 0; s < scripts.length; s++)
          if (scripts[s].hasAttribute("src") && scripts[s].getAttribute("src").toLowerCase() == pathLower)
            return;

        var newScript = document.createElement("script");
        newScript.src = path;

        tic_Utilities.AddEventListener(newScript, "load", onComplete);

        head.appendChild(newScript);
      },
      scriptLoaded = function (evt) {
        completed.push(evt.target.src);

        if (completed.length === scriptPaths.length && callback)
          callback();
      }

    for (var ii = 0; ii < scriptPaths.length; ii++)
      loadScriptFile(scriptPaths[ii], scriptLoaded);
  });
});


var modules = [

  "https://milwaukee.gov/CommonScripts/Reflex_Scripts/NWS.Display.ScrollContainer.js",
  "https://milwaukee.gov/CommonScripts/Reflex_Scripts/NWS.Display.SmoothAnchors.js",
  "https://milwaukee.gov/CommonScripts/Reflex_Scripts/NWS.Display.Accessible.js",

  // Third-party JS files
  "https://milwaukee.gov/CommonScripts/Reflex_Scripts/makeheight.js",
  "https://milwaukee.gov/CommonScripts/Reflex_Scripts/fitvid.js"
];

var init = function () {
  NWS.Display.ScrollContainer.init({
    element: "#contentArea table"
  });
  NWS.Display.InitHeaderAnimation({
    headerID: "headerArea",
    animateClass: "sticky"
  });
  NWS.Display.Accessible.init({
    element: "#navArea"
  });
  //NWS.Display.SmoothAnchors.init({ scrollSpeed : 1000 });
  //NWS.Display.SmoothAnchors.init({ fixedHeader: "#headerArea", pixelDifference: 20 });


  $(document).ready(function () {


    $('iframe[src*="youtube"]').parent().fitVids();

    /* NAV LINE BREAK*/
	  function replaceAt(navString, index,replacement){
		  return navString.substr(0, index) + replacement + navString.substr(index, (replacement.length+navString.length));
			}
	function checkWidth() {
		var windowSize = $(window).width();
		if (windowSize > 1200) {
			var navTopSpans = $("nav.hero li").length;
			
			for(var i=0; i<navTopSpans; i++){
				var navTopSpan = $("nav.hero span").eq(i).html();
				var lineBreak = navTopSpan.lastIndexOf(" ");
				if(navTopSpan.lastIndexOf(" ")>1){
					var newLink = replaceAt(navTopSpan,lineBreak, "<br />");
					$("nav.hero span").eq(i).html(newLink);
				}
			}
		}
	}
	checkWidth();

    // Show text box on click of seach icon
    $(".fa-search").click(function () {
        
        // Toggle active classes
        $(".search, .input").toggleClass("active");
        
        // Set focus on text box
        $("input[type='text']").focus();
    });
 

    /* HOME PAGE SLIDERS */
    $('.homeLayoutContainer #topZone').slick({
      dots: true,
      infinite: false,
      slidesToShow: 3,
      speed: 300,
      slidesToScroll: 1,
      variableWidth: true,
      arrows: false,
      responsive: [{
        breakpoint: 1250,
        settings: {
          slidesToShow: 1
        }
      }]
    });
    $('.homeLayoutContainer #topZoneFull').slick({
      dots: true,
      infinite: false,
      slidesToShow: 1,
      speed: 300,
      slidesToScroll: 1,
      variableWidth: true,
      arrows: false,
      responsive: [{
        breakpoint: 1250,
        settings: {
          slidesToShow: 1
        }
      }]
    });

    /* CARD CAROUSEL */
    $('.siteBounds').each(function () {
      $(this).children('.CardCarousel').wrapAll('<div class="CardCarouselContainer"/>')
    });

    $('.CardCarouselContainer').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 2,
      prevArrow: '<div class="slick-arrow slick-prev"><span class="fa fa-chevron-left"></span><span class="sr-only">Prev</span></div>',
      nextArrow: '<div class="slick-arrow slick-next"><span class="fa fa-chevron-right"></span><span class="sr-only">Next</span></div>',
      responsive: [{
          breakpoint: 1250,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });


    /* BOX STYLE HEIGHTS */
    $('.BoxStyle, .BoxStyle2, .BoxStyle3').matchHeight(true);


    /* ANIMATION*/
    NWS.UI.Animation.AnimateBlocks(".TitanBlock.CenterZone", 75, function (element) {});
    $(".TitanStripe.StripeDefault .TitanBlock:not(.PortTenant), .TitanStripe.StripeDark .TitanBlock, .TitanStripe.StripeLight .TitanBlock").addClass("fadeInUp");


    /* MAP */
    $('.PortTenant').wrapInner('<div class="popUpWrapper"><div class="popUpWrapperInside" /></div>');
    $('.PortTenant').addClass('MapModal')
    $('.PortMap .st').on('click', function () {
      var portTenant = $(this).attr('data-tenant');
      $('.Port-' + portTenant).fadeToggle();

    });

    $(".PortMap .st").on({
      mouseenter: function () {
        var portTenant = $(this).attr('data-tenant');
        $('.' + portTenant).addClass('HoverState');
      },
      mouseleave: function () {
        var portTenant = $(this).attr('data-tenant');
        $('.' + portTenant).removeClass('HoverState');
      }
    });

    /* Close Map */
    $(document).mouseup(function (e) {
      var container = $(".MapModal .popUpWrapperInside");
      if (!container.is(e.target) && $('.MapModal').is(':visible')
        && container.has(e.target).length === 0) {
        $('.MapModal').fadeOut();
      }
    });


    if ($(".fancybox").length) {
      $(".fancybox").fancybox();
    }

  }); // END DOCUMENT READY


};


NWS.Modules.Register(modules, init);
