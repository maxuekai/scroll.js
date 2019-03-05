## scroll.js api (v0.0.1)

兼容 ie8+， chrome， firefox

### html 结构

```html
<!-- 滚动窗口 s -->
<div class="scrollBox">
	<!-- 滚动条样式 s -->
	<div class="svSlider">
    	<div class="svbar"></div>
    </div>
	<!-- 滚动条样式 e -->
	<!-- 滚动内容 s -->
	<div class="scrollBoxMain"></div>
	<!-- 滚动内容 e -->
</div>
<!-- 滚动窗口 e -->
```

### css 样式 (之后可做内嵌）

```css
.scrollBox{
	position: relative;
	overflow: hidden;
	max-height:120px;	// 可调整也可改为height
}
.scrollBoxMain {
	position: relative;
	left:0;right:0;
}
/* 滚动条 */
.svSlider{
	height:100%;position: absolute;top:0;
	
	// 以下可根据具体情况进行调整
	z-index:10;
	width:4px;
	right:2px;
}
/* 滑块 */
.svSlider .svbar{
	position: absolute;
	
	// 以下可根据具体情况进行调整
	width:4px;
	background:#dadada;
	cursor:pointer;
}
```

### js

引入文件

```html
<script type="text/javascript" src="js/scroll.js"></script>
```

新建对象

```js
单个窗口滚动条
window.onload = function(){
	var scrollBox = document.querySelector('.scrollBox');
	var bar = new Bar(scrollBox, 30, function(){});
}

参数说明：
	new Bar(ele, speed, cb);
	ele(object): 滚动窗口dom，必选
	speed(number): 滚动速度,默认30，可选
	cb(function): callback函数，用于调用滚动时触发的事件,可选
	
可调用方法:
	bar.update(speed,cb)	// 更新滚动条，参数可加可不加
	bar.destory()			// 销毁滚动条，防止一直监听滚动事件带来的内存消耗
```

```js
多个窗口滚动条
window.onload = function(){
	var scrollbars = new Scrollbars(30);
}

参数说明:
	new Scrollbars(speed)
	speed(number): 滚动速度,默认30，可选

可调用方法：
	scrollbars.find(ele)	// 查找某个窗口的滚动条，返回一个 Bar 对象（见单个窗口滚动条)
							// ele(object): 滚动窗口dom（见单个窗口滚动条)
							
*注：多个窗口结构是一样的，class不做区分
```

ps：此为 0.0.1 beta版本，其中可能有些开发过程中还未发现的bug，欢迎指出，也欢迎提需求完善功能，thanks!
