// Only clients who pasted content from other sources into the workstation prior to Titan 6.6 may need this.

// If this moves into base and needs to keep the same naming pattern used by base, this alias could be added:
// NWS.initNamespace('NWS.Display.InitScrubeInlineStyles', NWS.Display.ScrubInlineStyles.init);

NWS.initNamespace('NWS.Display.ScrubInlineStyles', function () {

    // Private variable for this namespace
    var _params;
	
	function removeInlineStyles() {
		$elements.removeAttr(_params.attributesRemoved); // 'height width style'
		$elements.css({_params.cssRemoved}); // "height": "", "width": ""
	}

	return {
        /**
         * Scrubs inline styles and attributes from an element. This is designed primarily for tables, but could be used for other elements
         * @param {Object} params - An object containing the parameters
         * @param {Object} params.element - Required. The element to scrub. This can be a DOM element, a jQuery element, or a jQuery selector
         * @param {string} params.attributesRemoved - Optional. The text that appears above the element
         * @param {string} params.cssRemoved - Optional. The class name that appears around the text above the element
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
            if (typeof (_params.attributesRemoved) === 'undefined')
                _params.attributesRemoved = 'height width style';
            if (typeof (_params.cssRemoved) === 'undefined')
                _params.cssRemoved = '"height": "", "width": ""';

            $(document).ready(function () {
				removeInlineStyles();
            });
	};
});