// For a full explanation of this code, please refer to the blogpost at http://www.bram.us/2014/01/05/css-animated-content-switching/


 jQuery(function($) {

 	var startAnimation = function($panelContainer) {

 		// Set .animating class (which triggers the CSS to start the animation)
 		$panelContainer.addClass('animating');

 	};

 	var updatePanelNav = function($panelNav, $panelContainer, $panelToSlideIn, numPanels) {

 		// Find index of $panelToSlideIn in the $panelContainer
 		var idx = $panelToSlideIn.index('#' + $panelContainer.attr('id') + ' > .panel');

 		if (idx === 0) {
 			$panelNav.find('a[href="#prev"]').addClass('inactive');
 		} else {
 			$panelNav.find('a[href="#prev"]').removeClass('inactive');
 		}

 		if (idx == numPanels-1) {
 			$panelNav.find('a[href="#next"]').addClass('inactive');
 		} else {
 			$panelNav.find('a[href="#next"]').removeClass('inactive');
 		}

 	};

 	var stopAnimation = function($panelContainer, $panels, $panelToSlideIn) {

 		// Fix for browsers who fire this handler for both prefixed and unprefixed events (looking at you, Chrome): remove any listeners
 		// $panelToSlideIn.off('transitionend webkitTransitionEnd	MSTransitionEnd');

 		// An optional extra class (or set of classes) that might be set on the panels
 		//console.log($panels);
 		//console.log($panels.filter(':not(#' + $panelToSlideIn.attr('id')	+ ')'));

 		var extraClass = $panelContainer.data('extraclass') || '';

 		// set slid in panel as the current one
 		$panelToSlideIn.removeClass().addClass('panel current ' + extraClass);

 		// reset all other panels
 		$panels.filter(':not(#' + $panelToSlideIn.attr('id')	+ ')').removeClass().addClass('panel ' + extraClass);

 		// Allow a new animation
 		$panelContainer.removeClass('animating');

 	};

 	var setExitPanel = function($panelToSlideOut, exitAnimation) {

 		$panelToSlideOut
 			.addClass('exit ' + exitAnimation)
 			.removeClass('current');

 	};

 	var setEnterPanel = function($panelContainer, $panels, $panelToSlideIn, enterAnimation) {

 		$panelToSlideIn.addClass('enter ' + enterAnimation);

 	};

 
 	$('.move').on('click', function(e) {
 		var $panelToSlideOut = $($(this).closest('.panel'));
 		var $panelToSlideIn = $($(this).attr('href'));
 		//console.log($panelToSlideIn);
 		var $panelContainer =$('#panelWrapper2');
 		var $panels = $panelContainer.find('> .panel');
 		var animationDuration = ($panelContainer.data('sequential') == 'yes') ? 600 : 300;

 		var enterAnimation = $panelToSlideIn.data('enter')|| $panelContainer.data('enter') ;
 		var exitAnimation = $panelToSlideOut.data('exit') || $panelContainer.data('exit');

 				// Set the exit panel
 				setExitPanel($panelToSlideOut, exitAnimation);

 				// Set the enter panel
 				setEnterPanel($panelContainer, $panels, $panelToSlideIn, enterAnimation);

 				// Start the animation (immediately)
 				// @note: using a setTimeout because "it solves everything", dixit @rem
 				setTimeout(function() {
 					startAnimation($panelContainer);
 				}, 0);

 				setTimeout(function() {
 				stopAnimation($panelContainer, $panels, $panelToSlideIn);
 			}, animationDuration);

 	});



 });

function populate() {
	var username = $('#myName').val();
	var childname1 = $('#childName1').val();
	var childname2 = $('#childName2').val();
	if (username != '') {
		$('.personal-name').each(function(){
			this.innerHTML = username;
		});
	}
	if (childname1 != '') {
		$('.childs-name1').each(function(){
			this.innerHTML = childname1;
		});
	}

		if (childname2 != '') {
		$('.childs-name2').each(function(){
			this.innerHTML = childname2;
		});
	}

};

function Gtag_Event() {
	console.log ('GA event pushed');
	//var NextLocation = this.getAttribute('href');
	console.log ;
	gtag('event', 'Button Pressed', {
  // Event parameters
  'Event_Type': myType,
  'Event_Action': 'click',
  'Event_Label': NextLocation
  // ...
});
};