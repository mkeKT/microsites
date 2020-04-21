// If this moves into base and needs to keep the same naming pattern used by base, this alias could be added:
// NWS.initNamespace('NWS.Display.InitScrollContainer', NWS.Display.ScrollContainer.init);

NWS.initNamespace('NWS.Display.ScrollContainer', function () {

    // Private variable for this namespace
    var _params;

    function addScrollText($wrappers) {
        $wrappers.each(function () {
            if (hasHorizontalScrollBar($(this))) {
                $(this).prev('.' + _params.scrollTextClass).show();
            } else {
                $(this).prev('.' + _params.scrollTextClass).hide();
            }
        });
    }

    function hasHorizontalScrollBar(el) {
        return el.get(0).scrollWidth > el.innerWidth();
    }

    return {
        /**
         * Creates a horizontal scrolling container around an element. This is designed primarily for tables, but could be used for other elements
         * @param {Object} params - An object containing the parameters
         * @param {Object} params.element - Required. The element to scroll. This can be a DOM element, a jQuery element, or a jQuery selector
         * @param {string} params.scrollText - Optional. The text that appears above the element
         * @param {string} params.scrollTextClass - Optional. The class name that appears around the text above the element
         * @param {string} params.containerClass - Optional. The class name for the container around the element
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
            if (typeof (_params.scrollTextClass) === 'undefined')
                _params.scrollTextClass = 'scrollText';
            if (typeof (_params.containerClass) === 'undefined')
                _params.containerClass = 'scrollTable';

            $(document).ready(function () {
                _params.element.wrap('<div class="' + _params.containerClass + '"/>');
                var $wrappers = $('.' + _params.containerClass);
                $('<div class="' + _params.scrollTextClass + '">' + _params.scrollText + '</div>').insertBefore($wrappers);

                addScrollText($wrappers);

				$(window).resize(function () {
					addScrollText($wrappers);
				});
			});
        }
    };
});
