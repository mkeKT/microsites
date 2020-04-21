// If this moves into base and needs to keep the same naming pattern used by base, this alias could be added:
// NWS.initNamespace('NWS.Display.InitScrollContainer', NWS.Display.ScrollContainer.init);

NWS.initNamespace('NWS.Display.SlidingPanels', function () {

    // This doesn't store params at all, allowing this to easily be called multiple times on one page

    return {
        /**
         * Creates smoothe sliding panels - can be used for menus, filters or anything you want to slide in and out
         * @param {Object} params - An object containing the parameters
         * @param {string} params.openButton - Optional. An element that will open the sliding panel when clicked. This can be a DOM element, a jQuery element, or a jQuery selector
         * @param {string} params.closeButton - Optional. An element that will close the sliding panel when clicked. This can be a DOM element, a jQuery element, or a jQuery selector
         * @param {Object} params.panel - Optional. An element that is the sliding panel. This can be a DOM element, a jQuery element, or a jQuery selector
         * @param {string} params.direction - Optional. The direction you want the panel to slide from
         */

		init: function (params) {

			if (typeof (params.openButton) === 'undefined')
				params.openButton = '.slideOpenButton';
			if (!(params.openButton instanceof jQuery))
                params.openButton = $(params.openButton);

			if (typeof (params.closeButton) === 'undefined')
				params.closeButton = '.slideCloseButton';
			if (!(params.closeButton instanceof jQuery))
                params.closeButton = $(params.closeButton);

			if (typeof (params.panel) === 'undefined')
				params.panel = '.slidingPanel';
			if (!(params.panel instanceof jQuery))
                params.panel = $(params.panel);

			if (typeof (params.direction) === 'undefined')
                params.direction = 'right';
			
			$(document).ready(function() {
				params.openButton.click(function () {
					params.panel.toggle("slide", { direction: params.direction });
				});
			});

			$(document).mouseup(function (e) {
				// If the sliding panel is open, don't do anything
				if (!params.panel.is(':visible'))
					return;
				
				// If the mouseup event was because the user clicked on the open button, don't do anything
				if (params.openButton.is(e.target) || params.openButton.has(e.target).length > 0)
					return;
				
				// If the close button was clicked, close the panel
				if (params.closeButton.is(e.target) || params.closeButton.has(e.target).length > 0) {
					params.panel.toggle("slide", { direction: params.direction });
					return;
				}
				
				// If the panel was clicked, don't do anything
				if (params.panel.is(e.target) || params.panel.has(e.target).length > 0)
					return;
				
				// Close the panel
				params.panel.toggle("slide", { direction: params.direction });
				
			});
    	}
	};
});
