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
		isAddHash:true
	},options);

	$(document).on('click',$(this).selector,function () {
		//タグにアンカーがない指定したアンカー（target）を入れる
		var target = this.hash ? this.hash : options.target;

		global.smoothAnchor({
			easing: options.easing,
			speed: options.speed,
			target: target,
			delay: options.delay,
			complate: options.complate,
			isAddHash: options.isAddHash
		});
		return false;
	});
};


$.fn.smoothAnchorInit = function(options) {
	var options = $.extend({
		easing: 'easeOutQuart',
		speed: 1000,
		complate:'',

		isLoadedSmooth: true,
		isClickStop: false
	},options);

	sa.init({
		easing: options.easing,
		speed: options.speed,
		complate: options.complate,
		isLoadedSmooth: options.isLoadedSmooth,
		isClickStop: options.isClickStop
	});
};

var sa = (function() {
	//boxModelによって実装が違うみたいでたとえば、後方互換モードは body、Operaは html,body の両方指定にすると、不具合が出る
	var pageWrapTag = 'html,body',

		/**
		 * 初期設定
		 * @method init
		 */
		init = function(options){
			/* #ついてる場合ページトップからスムーズに移動
			※delayつけるとWebKit系でおかしくなるかも「?」は平気（普通に移動させたい場合は下のif消してください。）*/
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

				//WebKit系で上へ飛ばなかったための処理
				if (navigator.userAgent.indexOf('WebKit') != -1){
					location.hash = '';
				}
			}

			/* #を?にしても移動できます。#できたときは通常通りにして欲しい場合に
			（#は表示されません）*/
			if(options.isLoadedSmooth && document.URL.charAt(document.URL.indexOf('#')) !== '#' && document.URL.charAt(document.URL.indexOf('?')) == '?') {
				var hatenaTarget = document.URL.slice(document.URL.indexOf('?') + 1);
				global.smoothAnchor({
					easing: options.easing,
					speed: options.speed,
					target: '#' + hatenaTarget,
					delay : 350,
					complate: options.complate
				});
			}

			//アドレスに#1000,10など数値で指定している場合その位置に移動
			if(parseInt(location.hash.slice(1)) || parseInt(location.hash.slice(1)) == 0) {
				var targetAddress = location.hash.split(','),
					targetPositiontop = parseInt(targetAddress[1]),
					targetPositionleft = parseInt(targetAddress[0].slice(1));

				$(pageWrapTag).animate({
					scrollTop: targetPositiontop,
					scrollLeft: targetPositionleft
				},0,0);
			}

			// マウスでスクロールした時に実行
			if (window.addEventListener) window.addEventListener('DOMMouseScroll', scrollStop, false);
			window.onmousewheel = document.onmousewheel = scrollStop;

			//画面クリック時アニメーションを止める
			if(options.isClickStop) {
				$(document).click(function(){
					scrollStop();
				});
			}
		},

		/**
		 * スクロールストップ処理
		 * @method scrollStop
		 * @return {[type]} [description]
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
 * スクロール処理
 * Flashからでも手軽に呼び出せるようにGlobal変数にしています。
 */
global.smoothAnchor = function(options) {
	//初期設定
	var options = $.extend({
			easing: 'easeOutQuart',
			speed: 1000,
			delay: 0,
			target: '#header',
			complate: '',
			isAddHash: true
		},options);

		easing = options.easing,
		speed = options.speed,
		delay = options.delay,
		target = options.target,
		complate = options.complate,
		isAddHash = options.isAddHash,

		pageWrapTag = sa.pageWrapTag,
		documentHeight = $(document).height(),
		documentWidth = $(document).width(),
		windowHeight = $(window).height(),
		windowWidth = $(window).width();

	sa.scrollStop();

	//数字ターゲットの場合 数字の位置に移動（例 : #1000,10）
	if(parseInt(target.slice(1)) || parseInt(target.slice(1)) == 0) {
		target = target.split(',');
		var targetPosition = {
			top: parseInt(target[1]),
			left: parseInt(target[0].slice(1))
		}
	}
	//普通の場合
	else {
		var targetPosition = $(target).offset();
	}

	var targetPositiontop = targetPosition.top,
		targetPositionleft = targetPosition.left;

	//ウィンドウ幅により、目的のところまで行かないとき
	if(targetPositiontop > documentHeight - windowHeight) {
		if(!(documentHeight - windowHeight <= 0)) {
			targetPositiontop = documentHeight - windowHeight;
		}
	}
	if(targetPositionleft > documentWidth - windowWidth) {
		if(!(documentHeight - windowWidth <= 0)) {
			targetPositionleft = documentWidth - windowWidth;
		}
	}

	console.log(targetPositiontop,targetPositionleft,speed);

	// スクロール処理
	$(pageWrapTag).delay(delay).animate({
		scrollTop: targetPositiontop,
		scrollLeft: targetPositionleft
	}, speed, easing, function(){
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
