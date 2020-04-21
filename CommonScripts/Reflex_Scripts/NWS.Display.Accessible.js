// If this moves into base and needs to keep the same naming pattern used by base, this alias could be added:
// NWS.initNamespace('NWS.Display.InitScrollContainer', NWS.Display.ScrollContainer.init);

NWS.initNamespace('NWS.Display.Accessible', function () {

    // Private variable for this namespace
    var _params;

    //function someFunction() {
    //}

    return {
        /**
         * Creates a horizontal scrolling container around an element. This is designed primarily for tables, but could be used for other elements
         * @param {Object} params - An object containing the parameters
         * @param {Object} params.element - Required. The element to scroll. This can be a DOM element, a jQuery element, or a jQuery selector
         * @param {string} params.scrollText - Optional. The text that appears above the element
         */
        init: function (params) {
            _params = params;

            // Required parameters
            if (typeof (_params.element) === 'undefined')
                throw 'params.element must be defined';

            // Convert DOM element to jQuery element if needed
            if (!(_params.element instanceof jQuery))
                _params.element = $(_params.element);
			
            // Optional parameters
            if (typeof (_params.scrollText) === 'undefined')
                _params.scrollText = 'Scroll table to view all';
			
            $(document).ready(function () {
               
                //add function here
				
				/* KEYBOARD ACCESSIBLE NAVIGATION */

				/* html changes - insert in nav xsl at some point */
				$('#navArea .top > ul > li > ul').parent().addClass('has-submenu');
				$('#navArea li.has-submenu > a').attr('aria-haspopup', 'true');
				$( "<a tabindex='0' class='toggleMenuButton'><i class='fa fa-arrow-circle-down'></i><span class='visuallyhidden'>show submenu for</span></a>" ).insertAfter( "#navArea li.has-submenu > a");
				$('#navArea li.has-submenu a.hasChild span').each(function(){
					var menuTitle = $(this).text()
					$(this).parent().next().children('span').append('' + menuTitle + '');
				});


				/* toggle menu on enter key */
				$('a.toggleMenuButton').keypress(function (e) {
					var keyCode= e.which; 
					if(keyCode == 13)  // the enter key code
						 {
						 $(this).parent().toggleClass('open');
						 $(this).attr('aria-expanded', toggleAriaExpanded);
						 $(this).prev().attr('aria-expanded', toggleAriaExpanded);
					}
				});

				/* tabbing - close menu on last item */
				$('#navArea li.has-submenu > ul > li:last-child a').on('keydown', function(e) { 
				  var keyCode = e.which; 
				  if (keyCode == 9) { // the tab key
					$(this).closest('.has-submenu').removeClass('open');
					$(this).parent().parent().siblings().attr('aria-expanded', toggleAriaExpanded);
				  } 
				});

				/* escape - close menu on last item and close mobile menu */
				$(document).keyup(function(e) {
				  if (e.keyCode === 27) {
					  $('#navArea li.has-submenu').removeClass('open');   // esc - close subemenus
					  $('#navArea li.has-submenu > a').attr('aria-expanded', toggleAriaExpanded);
					  $('#navOpener').prop('checked', false); // close mobile menu
				  }
				});

				/* toggle aria expanded values */
				function toggleAriaExpanded(i, attr){return attr == 'true' ? 'false' : 'true'}

				$(window).resize(function () {
					//add function here
				});
			});
        }
    };
});
