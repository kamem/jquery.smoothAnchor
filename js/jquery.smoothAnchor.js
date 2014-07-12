/**
 *	jQuery smoothAnchor.
 *	jQuery required.
 *	jQuery Easing Plugin extends this Plugin.
 *
 *	* Copyright 2014 (c) kamem
 *	* http://develo.org/
 *	* Licensed Under the MIT.
 *
 *	Date: 2014.07.12
 *
 *	@class smoothAnchor
*/
(function($,global){

$(function() {
	$(window).smoothAnchorInit();
	$('a[href^="#"]').smoothAnchor();
});

//jQuery Plugin
$.fn.smoothAnchor = function(options) {
	var options = $.extend({
		easing: 'easeOutQuart',
		speed: 1000,
		delay: 0,
		target: '#header',
		complate:'',
		isAddHash: true,
		isTopScroll: true,
		isLeftScroll: true
	},options);

	$(document).on('click',$(this).selector,function () {
		//Add the value specified for the target if the hash is not in the tag.
		var target = this.hash ? this.hash : options.target;

		global.smoothAnchor({
			easing: options.easing,
			speed: options.speed,
			target: target,
			delay: options.delay,
			complate: options.complate,
			isAddHash: options.isAddHash,
			isTopScroll: options.isTopScroll,
			isLeftScroll: options.isLeftScroll
		});
		return false;
	});
};

//Processing after loading.
$.fn.smoothAnchorInit = function(options) {
	var options = $.extend({
		easing: 'easeOutQuart',
		speed: 1000,
		complate:'',

		isLoadedSmooth: true,
		isLoadedSmoothQuestionMark: true,
		isClickStop: false
	},options);

	sa.init({
		easing: options.easing,
		speed: options.speed,
		complate: options.complate,
		isLoadedSmooth: options.isLoadedSmooth,
		isLoadedSmoothQuestionMark: options.isLoadedSmoothQuestionMark,
		isClickStop: options.isClickStop
	});
};

/**
 * @method sa
 * @return {Object} Processing associated with scrolling.
 */
var sa = (function() {
	var pageWrapTag = 'html,body',

		/**
		 * @method init
		 */
		init = function(options){
			// Move smoothly after loading.
			if(options.isLoadedSmooth && location.hash.charAt(0) == '#') {

				$(pageWrapTag).animate({
					scrollTop: 0,
					scrollLeft: 0
				},0,0);

				global.smoothAnchor({
					easing: options.easing,
					speed: options.speed,
					target: location.hash,
					complate: options.complate
				});

				//Processing when it did not start from the top in WebKit.
				if (navigator.userAgent.indexOf('WebKit') != -1){
					location.hash = '';
				}
			}

			// You can use the "?" Instead of "#". If you want to normal operation when the "#".
			if(options.isLoadedSmoothQuestionMark && document.URL.charAt(document.URL.indexOf('#')) !== '#' && document.URL.charAt(document.URL.indexOf('?')) == '?') {
				var hatenaTarget = document.URL.slice(document.URL.indexOf('?') + 1);
				global.smoothAnchor({
					easing: options.easing,
					speed: options.speed,
					target: '#' + hatenaTarget,
					delay : 350,
					complate: options.complate
				});
			}

			//The move to that position if you have specified a number, such as "# 1000," in the address.
			if(parseInt(location.hash.slice(1)) || parseInt(location.hash.slice(1)) == 0) {
				var targetAddress = location.hash.split(','),
					targetPositiontop = parseInt(targetAddress[1]),
					targetPositionleft = parseInt(targetAddress[0].slice(1));

				$(pageWrapTag).animate({
					scrollTop: targetPositiontop,
					scrollLeft: targetPositionleft
				},0,0);
			}

			// Stop processing when you scroll with the mouse.
			if (window.addEventListener) window.addEventListener('DOMMouseScroll', scrollStop, false);
			window.onmousewheel = document.onmousewheel = scrollStop;

			// Stop processing when you click on the screen.
			if(options.isClickStop) {
				$(document).click(function(){
					scrollStop();
				});
			}
		},

		/**
		 * Scroll stop processing
		 * @method scrollStop
		 */
		scrollStop = function(){
			$(pageWrapTag).queue([]).stop();
		};

	return {
		pageWrapTag: pageWrapTag,
		init: init,
		scrollStop: scrollStop
	}
})();

/*
 * Processing of the scroll.
 * It is specified in the Global variable to be able to run from Flash.
 */
global.smoothAnchor = function(options) {
	var options = $.extend({
			easing: 'easeOutQuart',
			speed: 1000,
			delay: 0,
			target: '#header',
			complate: '',
			isAddHash: true,
			isTopScroll: true,
			isLeftScroll: true
		},options);

		easing = options.easing,
		speed = options.speed,
		delay = options.delay,
		target = options.target,
		complate = options.complate,
		isAddHash = options.isAddHash,
		isTopScroll = options.isTopScroll,
		isLeftScroll = options.isLeftScroll,

		pageWrapTag = sa.pageWrapTag,
		documentHeight = $(document).height(),
		documentWidth = $(document).width(),
		windowHeight = $(window).height(),
		windowWidth = $(window).width();

	sa.scrollStop();

	//The move to that position if hash is a number.（ex: #1000,10）
	if(parseInt(target.slice(1)) || parseInt(target.slice(1)) == 0) {
		target = target.split(',');
		var scroll = {
			scrollTop: parseInt(target[1]),
			scrollLeft: parseInt(target[0].slice(1))
		};
	} else {
		var targetPosition = $(target).offset(),
			scroll = {
				scrollTop: targetPosition.top,
				scrollLeft: targetPosition.left
			};
	}

	// If you can not scroll to the desired position.
	if(scroll.scrollTop > documentHeight - windowHeight) {
		if(!(documentHeight - windowHeight <= 0)) {
			scroll.scrollTop = documentHeight - windowHeight;
		}
	}
	if(scroll.scrollLeft > documentWidth - windowWidth) {
		if(!(documentHeight - windowWidth <= 0)) {
			scroll.scrollLeft = documentWidth - windowWidth;
		}
	}

	// Scroll in one direction only.
	if(!isTopScroll) {
		delete scroll.scrollTop;
	}
	if(!isLeftScroll) {
		delete scroll.scrollLeft;
	}

	$(pageWrapTag).delay(delay).animate(scroll, speed, easing, function(){
		sa.scrollStop();
		if(isAddHash && document.URL.charAt(document.URL.indexOf('?')) !== '?') {
			location.hash = target;
		}
		if(complate){
			complate();
		};
	});
}
}(jQuery,this));
