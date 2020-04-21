/* - tag bar --------------------------------------------------------- */
NWS.initNamespace('NWS.Display.TagBar',function(){

    // Private variable for this namespace
    var _params;

	function createTagBars() {
		// Creates tag bars for all filter blocks on the page
		$('.TagBar .DataListing').each(function () {
			var filterBlockID = $(this).find('.items').parent().attr('id').split('_')[0].substring(1);
			initTagBar(filterBlockID);
		});
	}

	function initTagBar(filterBlockID) {
		$('#F' + filterBlockID + '_ResultsDiv').parent().children('.listingTools').after('<div id="tagBar_' + filterBlockID + '" class="tagBar"></div>');

		updateTagBar(filterBlockID);

		$('#FilterArea_F' + filterBlockID + '_ fieldset :checkbox').change(function () {
			updateTagBar(filterBlockID);
		});
	}

	function updateTagBar(filterBlockID) {
		var curSelections = '';

		$('#FilterArea_F' + filterBlockID + '_ fieldset').each(function () {
			var name = $(this).find('div.head h4').text(); // the classification name
				
			//$(this).find('input:checked').parent().parent('div').each(function () {
			$(this).find('input:checked').closest('div').each(function () {
				var containsCheckbox = false;

				$(this).find(':checkbox:checked').each(function () {
					var value = $(this).siblings('label[for="' + $(this).attr('id') + '"]').text(); // the attribute name
					value = value.replace(new RegExp('\\s\\(\\d+\\)$'), ''); // remove the counts at the end of any labels
					curSelections += '<span class="tagBarSelectedTag" onclick="NWS.Display.TagBar.uncheckTagBarItem(' + filterBlockID + ',\'' + $(this).attr('id') + '\');"><span class="tagBarSelectedTagValue">' + value + '</span></span>';
					containsCheckbox = true;
				});

				if (!containsCheckbox) {
					var value = $(this).find('span.item').text();
					value = value.replace(new RegExp('\\s\\(\\d+\\)$'), ''); // remove the counts at the end of any labels

					curSelections += '<span class="tagBarSelectedTag" onclick="NWS.Display.TagBar.uncheckTagBarItem(' + filterBlockID + ',\'' + $(this).attr('id').replace('_div', '') + '\');"><span class="tagBarSelectedTagValue">' + value + '</span></span>';
				}
			});
		});

		if (curSelections == '')
			$('#tagBar_' + filterBlockID).hide();
		else
			$('#tagBar_' + filterBlockID).html('<span class="tagBarSelections"><span class="selectionsTitle">' + _params.selectionsTitle + '</span>' + curSelections + '</span>').show();
			   
	}

	return {
        /**
         * @param {Object} params - An object containing the parameters
         * @param {Object} params.selectionsTitle - Optional. The label displayed in front of selected tags in the tag bar
         */
		init: function (params) {
			_params = params;
			
			if (typeof(_params.selectionsTitle) === 'undefined')
				_params.selectionsTitle = 'Your Selections: ';

            $(document).ready(function () {
				createTagBars();
            });
		},
		uncheckTagBarItem: function (filterBlockID, checkBoxID) {
			var ctl = $('#' + checkBoxID);
			ctl.prop('checked', false)
			ctl.closest('.selected').removeClass('selected');

			// The checkbox has an ID like F1_C1_A1 - we want to extract the classification ID, which is the middle of those three numbers
			var classificationID = ctl.attr('id').split('_')[1].substring(1);
			DataList_ClassificationDynamicCheck(filterBlockID, classificationID, this)

			updateTagBar(filterBlockID);
		}
	};
});