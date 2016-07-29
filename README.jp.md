# jquery.scrollParallax

同一ページ内のアンカー（ハッシュ）にスムーズにスクロールします。

仕様
------
1. アンカーで移動後にアドレスを変更（アドレスにハッシュを付与する）。
2. 座標を指定してのページ内リンク。
3. ロード時にページの先頭からハッシュの位置までスムーズに移動することができる。
4. 移動完了後に指定した関数を実行。
5. スクロール途中、マウススクロールしたときにカクカクした動きをする問題をスクロールをストップすることで回避。
6. スクロール途中に画面をクリックした場合にスクロールが止まる。

デモ
------

[DEMO](http://github.develo.org/jquery.smoothAnchor/)


必要なプラグイン
------

* jquery
* [jquery.easing](https://github.com/gdsmith/jquery.easing)


スクロール時の`animate`の`easing`の初期値に`easeOutQuart`を使用しているため、このプラグインが必要です。


## インストール

### Npm

	npm install jquery.smooth-anchor


使い方
------
    <script src="js/jquery.js"></script>
    <script src="js/jquery.easing.js"></script>
    <script src="js/jquery.smoothAnchor.js"></script>
    <script>
    $.smoothAnchorByLoaded();
    $('a[href^="#"]').smoothAnchor();
    </script>

### a要素以外につけたい場合
    $('h1').smoothAnchor({
    	target: '#header'
    });


### 移動後に関数実行
    $('a[href^="#"]').smoothAnchor({
    	complate: function(e) {
    		console.log(e);
    	}
    });


### 座標を指定してリンク
 	#1000,1000
 	//（x, y）


### 任意のタイミングでスクロールする

    $.smoothAnchorStart({
    	target: '#header'
    });

Options
------

| option name| type | Descriptions |default
|:-----------|:------------|:------------|:------------|
| easing | String | イージングの種類 |`'easeOutQuart'`
| speed | Number | スクロールスピード | `1000`
| delay | Number | スクロール開始までの待ち時間($('body').animate.delay(**delay**) |`-999999`
| target | String or jQuery Object | 直接ターゲットを指定する (例) `#header` or `$(#header)`  ※ 値の指定がない場合は(0, 0)になります。 | `undefined`
| complate | Function | スクロール完了後に実行したい関数 | `''`
| isAddHash | Boolean | スクロール後にhashを追加するか | `true`
| isTopScroll | Boolean | 縦方向にスクロールするか | `true`
| isLeftScroll | Boolean | 横方向にスクロールするか | `true`

### 初期設定 ###
	//ロード時の処理
    $.smoothAnchorByLoaded({
        easing: 'easeOutQuart',
        speed: 1000,
        complate:'',
        target: location.hash,
        isAddHash: true,
        isTopScroll: true,
        isLeftScroll: true
    });

	//クリック時の処理
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
