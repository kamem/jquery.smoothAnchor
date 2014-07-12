jquery.smoothAnchor.js
======================
* 日本語 : [jQueryでスムーズスクロールプラグイン][blogEntry]
*  [DEMO](http://github.develo.org/jquery.smoothAnchor/)

[blogEntry]: http://develo.org/2010/09/05/1301.html "jQueryでスムーズスクロールプラグイン"


Specification
------
1. Put a hash after you scroll smoothly.
2. [Links of specifying the coordinates](#zahyou).
3. Scroll to the position when the coordinate hash is attached to the load.
4. It is possible to scroll smoothly at load time.
5. [Function is executed after the movement](#complate).
6. Stop processing when you scroll the mouse during .


Usage
------
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/smoothAnchor.js"></script>

### Init ###
    $(window).smoothAnchorInit();
    $('a[href^="#"]').smoothAnchor();


### If you want to run with the tag of "a element" other than ###
    $('h1').smoothAnchor({easing : 'easeOutQuart',speed : 1000,target: '#header'});


### If you are running from Flash ###
    ExternalInterface.call("smoothAnchor",{easing : "easeOutElastic",speed : 1000,target : "#header"});
It becomes the [initial](#default) state if there is no argument.

### <a name="complate">Execution of the function after the movement ###
    $('a[href^="#"]').smoothAnchor({
    	easing: 'easeOutQuart',
    	speed: 1000,
    	target: '#header',
    	complate:'test'
    });

### <a name="zahyou">Scroll by specifying the coordinates ###
 #1000,1000（x, y）

Options
------
### <a name="default">Init ###
    $(window).smoothAnchorInit({
        easing: 'easeOutQuart',
        speed: 1000,
        complate:'',
        isLoadedSmooth: true,
        isLoadedSmoothQuestionMark: true,
        isClickStop: false,
        isTopScroll: true,
        isLeftScroll: true
    });
    $('a[href^="#"]').smoothAnchor({
        easing: 'easeOutQuart',
        speed: 1000,
        delay: 0,
        target: '#header',
        complate: '',
        isAddHash: true,
        isTopScroll: true,
        isLeftScroll: true
    });


* easing: {String} Type of easing,
* speed: {Number} speed,
* delay: {Number} delay,
* target: {String} '#header',
* complate: {Function} Name of function to run after the scroll.
* isAddHash: {Boolean} Whether or not to assign a hash after the scroll.
* isTopScroll: {Boolean} Whether or not to scroll vertically.
* isLeftScroll: {Boolean} Whether or not to scroll horizontally.
* isLoadedSmooth: {Boolean} Whether or not to smooth scrolling after loading.
* isLoadedSmoothQuestionMark: {Boolean} Whether or not to smooth scrolling using the "?" After loading.
* isClickStop: {Boolean} Whether or not to stop the process when clicked.


License
----------
+ Copyright 2009 &copy; kamem
+ [http://www.opensource.org/licenses/mit-license.php][mit]

[develo.org]: http://develo.org/ "develo.org"
[MIT]: http://www.opensource.org/licenses/mit-license.php
