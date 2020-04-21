// If this moves into base and needs to keep the same naming pattern used by base, this alias could be added:
// NWS.initNamespace('NWS.Display.InitSmoothAnchors', NWS.Display.SmoothAnchors.init);

/* - named anchors --------------------------------------------------------- */
NWS.initNamespace('NWS.Display.SmoothAnchors',function(){

    // Private variable for this namespace
    var _params;

	function setClickHandler(){
		$('a[href*="#"]:not([href="#"])').on('click',function(e){
			if(location.pathname.replace(/^\//,'') != this.pathname.replace(/^\//,'') && location.hostname != this.hostname)
				return;
			scrollToNamedAnchor(this.hash);
			return false;
		});                       
	}
	
	function getTarget(hash) {
		if ($('a[name=' + hash.slice(1) +']').length)
			return $('a[name=' + hash.slice(1) +']')
		else
			return $('[id=' + hash.slice(1) +']');
	}
	
	function scrollToNamedAnchor(hash) {				
		if (hash == '')
			return;
		
		var target = _params.getTarget(hash);

		if (!target.length)
			return;

		var pageTopDifference = _params.pageTopHeight + _params.pixelDifference;

		$('html,body').animate({
			 scrollTop: target.offset().top - pageTopDifference
		}, _params.scrollSpeed);
	}
	function scrollOnPageLoad(params){
		setTimeout(function() { scrollToNamedAnchor(params,location.hash) }, 500);
	}

	return {
        /**
         * @param {Object} params - An object containing the parameters
         * @param {Object} params.getTarget - Optional. A function used to get the target of a hash. This example will look for any element with an ID matching the hash (instead of looking for a named anchor): init({ getTarget: function(hash) { return $('[id=' + hash.slice(1) +']'); } });
         * @param {string} params.fixedHeader - Optional. Default value is '#pageTopArea'
         * @param {string} params.scrollSpeed - Optional. Default value is 500.
         * @param {string} params.pageTopHeight - Optional. Default value is the height of the fixed header.
         * @param {string} params.pixelDifference - Optional. Default value is 0
         */
		init: function (params) {
			_params = params;
			
			if (typeof(_params.fixedHeader) === 'undefined')
				_params.fixedHeader = '#headerArea';
			if (typeof(_params.scrollSpeed) === 'undefined')
				_params.scrollSpeed = 500;
			if (typeof(_params.pageTopHeight) === 'undefined')
				params.pageTopHeight = $(params.fixedHeader).outerHeight();
			if($(_params.fixedHeader).css('position') != 'fixed' && typeof(_params.pageTopHeight) === 'undefined')
				params.pageTopHeight = 60;
			if (typeof(_params.pixelDifference) === 'undefined')
				_params.pixelDifference = 0;
			if (typeof(_params.getTarget) === 'undefined')
				_params.getTarget = getTarget;

            $(document).ready(function () {
				setClickHandler();
				scrollOnPageLoad(location.hash);
            });
		}
	};
});