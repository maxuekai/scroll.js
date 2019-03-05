function Scrollbars(s, cb) {

  this.oWpe = document.querySelectorAll('.scrollBox');
  if(this.oWpe.length == 1) {
    return new Bar(this.oWpe[0], s, cb);
  }else if(this.oWpe.length > 1) {
    this.bars = [];
    for(var i = 0; i < this.oWpe.length; i++) {
      this.bars.push(new Bar(this.oWpe[i], s, cb));
    }
  }else {
    return false;
  }
  
}

Scrollbars.prototype = {
  find: function(el) {
    var res;
    this.bars.forEach(function(ele, index){
      if(ele.ele === el) {
        res = ele;
      }
    });
    return res;
  }
}

function Bar(ele, s, cb){
  this.ele = ele;
  this.cb = cb;
  this.oBox = ele.querySelector('.svbar');
  this.oParent = ele.querySelector('.svSlider');
  this.oDiv = ele.querySelector('.scrollBoxMain');
  this.update(s, cb);
}
  
Bar.prototype = {
  destroy: function(cb) {
    this.oDiv.style.top = 0;
    this.oParent.style.display = 'none';
    this.removeAllEvent(cb);
  },
  removeAllEvent: function(cb) {
    this.removeEvent(this.ele, 'mousewheel', function(){cb();});
    this.removeEvent(this.ele, 'DOMMouseScroll', function(){cb()});
  },
  update: function(s, cb) {
    this.removeAllEvent();
    var _this = this;
    var s = s ? s : 30;
    var maxHeight = 0, oDivHeight = 1;
    if(window.getComputedStyle) {
      var maxh = window.getComputedStyle(this.ele)['max-height'] ? window.getComputedStyle(this.ele)['max-height'] : window.getComputedStyle(ele)['height'];
      maxHeight = parseFloat(maxh.replace('px',''));
      oDivHeight = this.oDiv.offsetHeight;
    }

    if(maxHeight < oDivHeight) {

      this.setBarHeight();
      this.cb = function(ev){
        _this.mouseWheel(ev, s);
        if(cb) {
          cb();
        }
      }
      this.addEvent(this.ele, 'mousewheel', this.cb);
      this.addEvent(this.ele, 'DOMMouseScroll', this.cb);
      this.oBox.onmousedown = function(ev){
        var oEv = ev || event;
        var disY = oEv.clientY - _this.oBox.offsetTop;
        
        document.onmousemove = function(ev){
          var oEv = ev || event;
          var l = oEv.clientY - disY;

          _this.setTop(l);
          if(cb) {
            cb();
          }
        }

        document.onmouseup = function(){
          document.onmousemove = null;
          document.onmouseup = null;
        }

        return false;
      }
    }else {
      this.oParent.style.display = 'none';
    }
    return true;
  },
  mouseWheel: function(ev, s) {
    window.requestAnimationFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function(callback){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    var oEv = ev || event;
    var delta = oEv.wheelDelta;
    oEv.stopPropagation ? oEv.stopPropagation() : oEv.cancelBubble = true;
    var _this = this;
    if(!this.scrolling) {
      this.scrolling = true;
      requestAnimationFrame(function() {
        if(delta > 0) {
          _this.setTop(_this.oBox.offsetTop - s);
        }else{
          _this.setTop(_this.oBox.offsetTop + s);
        }
        
        _this.scrolling = false;
      })
    }
    
    if(oEv.preventDefault){
      oEv.preventDefault();
    }else {
      oEv.returnValue = false;
    }
    return false;
  },
  setLeft: function(l){
    if(l < 0){
      l = 0;
    }else if(l > this.oParent.offsetWidth - this.oBox.offsetWidth){
      l = this.oParent.offsetWidth - this.oBox.offsetWidth;
    }

    this.oBox.style.left = l + 'px';
    var bl = l/(this.oParent.offsetWidth - this.oBox.offsetWidth);
    this.oDiv.style.top = - (this.oDiv.offsetHeight - this.oWp.offsetHeight)*bl + 'px';
  },
  setTop: function(l){
    if(l < 0){
      l = 0;
    }else if(l > this.oParent.offsetHeight - this.oBox.offsetHeight){
      l = this.oParent.offsetHeight - this.oBox.offsetHeight;
    }
  
    this.oBox.style.top = l + 'px';
    var bl = l*this.oDiv.offsetHeight/this.oParent.offsetHeight;
    this.oDiv.style.top = -bl + 'px';
  },
  setBarHeight: function(){
    var wh = this.oParent.offsetHeight;
    var mh = this.oDiv.offsetHeight;
    var bh = wh*wh / mh;
    this.oBox.style.height = bh + 'px';
  },
  addEvent: function(obj, sEv, fn){
    if(obj.attachEvent){
      obj.attachEvent('on' + sEv,fn);
    }else{
      obj.addEventListener(sEv,fn,false);
    }
  },
  removeEvent: function(obj, sEv, fn) {
    if(obj.detachEvent){
      obj.detachEvent('on' + sEv, fn);
    }else {
      obj.removeEventListener(sEv, fn, false);
    }
  }
}