# jquery.scrollParallax

Description
------
1. Put a hash after you scroll smoothly.
2. Anchor of specifying the coordinates.
3. It is possible to scroll smoothly at load time.
4. Function is executed after the movement.
5. When you scroll with the mouse in the middle that are scrolling, avoided by stopping the scroll the problem of jumpy.
6. Scrolling stops when you click on the screen between the scroll.

Demo
------

[DEMO](http://github.develo.org/jquery.smoothAnchor/)


Requirement
------
* jquery
* [jquery.easing](https://github.com/gdsmith/jquery.easing)


Because you are using a `easeOutQuart` to the initial value of` animate` of `easing` at the time of the scroll, you must have this plug-in.


## Install

### Npm

	npm install jquery.smooth-anchor


Usage
------
    <script src="js/jquery.js"></script>
    <script src="js/jquery.easing.js"></script>
    <script src="js/jquery.smoothAnchor.js"></script>
    <script>
    $.smoothAnchorByLoaded();
    $('a[href^="#"]').smoothAnchor();
    </script>

### If you want to add an event other than 'a tag'.
    $('h1').smoothAnchor({
    	target: '#header'
    });


### Function is executed after the movement.
    $('a[href^="#"]').smoothAnchor({
    	complate: function(e) {
    		console.log(e);
    	}
    });


### Hash of specifying the coordinates.
 	#1000,1000
 	//（x, y）


### Scroll at any timing.

    $.smoothAnchorStart({
    	target: '#header'
    });


Options
------

| option name| type | Descriptions |default
|:-----------|:------------|:------------|:------------|
| easing | String | Type of easing |`'easeOutQuart'`
| speed | Number | Scroll speed | `1000`
| delay | Number | Delay Time of up to scroll start.($('body').animate.delay(**delay**) |`-999999`
| target | String or jQuery Object | Directly specify the target (例) `#header` or `$(#header)`  ※ If you do not specify a value is (0, 0). | `undefined`
| complate | Function | Function you want to run after the scroll is complete. | `''`
| isAddHash | Boolean | add the hash after scroll. | `true`
| isTopScroll | Boolean | Scroll to the vertical direction | `true`
| isLeftScroll | Boolean | Scroll to the horizontal direction | `true`

### Initial setting ###
	$.smoothAnchorByLoaded({
	    easing: 'easeOutQuart',
	    speed: 1000,
	    complate:'',
	    target: location.hash,
	    isAddHash: true,
	    isTopScroll: true,
	    isLeftScroll: true
	});

	$('a[href^="#"]').smoothAnchor({
	    easing: 'easeOutQuart',
	    speed: 1000,
	    delay: 0,
	    target: undefined,
	    complate: '',
	    isAddHash: true,
	    isTopScroll: true,
	    isLeftScroll: true
	});
