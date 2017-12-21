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

	$("#myName").keyup(function(event) {
		//console.log('here');
    	if (event.keyCode === 13) {
        	$("#start").click();
    	}
	});

	$("#skip").click(function(event){
		var $panelToSlideOut = $($('.current').closest('.panel'));
 		var $panelToSlideIn = $($('#End-Panel').closest('.panel'));
 		var $panelContainer =$('#panelWrapper2');
 		var $panels = $panelContainer.find('> .panel');
 		var animationDuration = 600;

 		

 		var enterAnimation = $panelToSlideIn.data('enter')|| $panelContainer.data('enter') ;
 		var exitAnimation = $panelToSlideOut.data('exit') || $panelContainer.data('exit');
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

 				console.log($('#End-Panel').is('.fade'));
 				if ($('#End-Panel').is('.fade')){
 						console.log($('.swap'));
 					var image = $('#mySwap')[0].style.backgroundImage;

            		$('#mySwap').css('background',image);

 				}
	});

	

 });


function populate() {
	var username = $('#myName').val();
	if (username != '') {
		$('.personal-name').each(function(){
			$(this).removeClass('uppercase');
			var word = this.innerHTML;

			if($(this).hasClass('comma-space')) {
			 	this.innerHTML = username + ', ' + word;
			 }
			 else {
			 	this.innerHTML = ', ' + username + word;
			 }
		});
	
	}

};

function Gtag_Event(myType, el) {
	console.log ('GA event pushed');
	var NextLocation = $(el).attr('href');
	console.log (NextLocation);
	gtag('event', 'Button Pressed', {
  // Event parameters
  'event_type': myType,
  'event_action': 'click',
  'event_label': NextLocation
  
  // ...
	});
	
	if (myType != "Take Action"){
		fbq('trackCustom', NextLocation);
	}
};


function LP_Action_FB() {
	console.log('FB button')
	fbq('trackCustom', '#Question-1');
}



  // Parse the URL
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        console.log(results);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
// Give the URL parameters variable names




function PassParameters(el){

	var source = getParameterByName('utm_source');
	var medium = getParameterByName('utm_medium');
	var campaign = getParameterByName('utm_campaign');
	var content = getParameterByName('utm_content');
	var term = getParameterByName('utm_term');
	var newURL = "https://donate.starlight.org.au/what-would-you-do//?";

	if (source != ""){
		newURL += "utm_source=" + source;
	}
	if (medium != ""){
		newURL += "&utm_medium=" + medium;
	}

	if (campaign != "") {
		newURL += "&utm_campaign=" + campaign;
	}

	if (term != "") {
		newURL += "&utm_term=" + term;
	}

	if (content != ""){
		newURL += "&utm_content=" + content;
	}


	$(el).attr('href', newURL); 

};

function onShareClick(type) {

	gtag('event', 'Share Button', {
  // Event parameters
  'event_type': 'Share click',
  'event_action': 'share',
  'event_label': type
   });

	fbq('trackCustom',type);

}
