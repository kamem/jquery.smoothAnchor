smoothAnchor.js
======================
+ [develo.org][develo.org] : [jQueryでスムーズスクロールプラグイン][blogEntry]
+  [サンプル](http://develo.org/smoothAnchor/)

[blogEntry]: http://develo.org/2010/09/05/1301.html "jQueryでスムーズスクロールプラグイン"


仕様
------
1. アンカーで飛んだあとアドレスもちゃんと変更。
2. [座標を指定してのページ内リンク](#zahyou)。
3. アクセス時、座標アンカーがついている場合その位置に移動します。
4. アクセス時ページの先頭からその場所までスムーズに移動できるようにすることもできます。
5. [移動後の関数実行](#func)。
6. スクロール途中、マウススクロールしたときにカクカクした動きをする問題をスクロールをストップすることで回避。


使い方
------
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/smoothAnchor.js"></script>

### 初期状態 ###
    $('a[href^="#"]').smoothAnchor();


### a要素以外につけたい場合 ###
    $('h1').smoothAnchor({easing : 'easeOutQuart',speed : 1000,target: '#header'});


### Flashから実行する場合 ###
    ExternalInterface.call("smoothAnchor",{easing : "easeOutElastic",speed : 1000,target : "#header"});
引数がない場合は[初期状態](#default)になります。

### <a name="func">移動後の関数の実行 ###
    $('a[href^="#"]').smoothAnchor({easing : 'easeOutQuart',speed : 1000,target: '#header',func:'test'});

### <a name="zahyou">座標を指定してリンク ###
 #1000,1000（x座標, y座標）

オプション
------
+ <span id="easing">easing : イージングの種類(String) : [jQuery Easing Plugin](http://gsgd.co.uk/sandbox/jquery/easing/) : [jQuery Easing - jQuery 日本語リファレンス](http://semooh.jp/jquery/cont/doc/easing/),  
+ <span id="speed">speed : スピード(Number),  
+ <span id="target">target: 飛び先のページ内リンク(String) :  (例 : '#header')
+ func : 関数の名前(String)

### <a name="default">初期状態 ###
+ easing : 'easeOutQuart'
+ speed : 1000
+ arget: '#header' 


ライセンス
----------
+ Copyright 2009 &copy; kamem
+ [http://www.opensource.org/licenses/mit-license.php][mit]

[develo.org]: http://develo.org/ "develo.org"
[MIT]: http://www.opensource.org/licenses/mit-license.php