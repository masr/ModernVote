/**
 * @author Abraham
 * 动画相关的JS类库，由Abe编写
 * Email:abraham1@163.com
 * qq:380850433
 */
var Abe$ = function(id){
    var ele = id;
    if (typeof id === 'string') 
        ele = document.getElementById(id);
    return new AbeAnimate(ele);
}

/**
 *
 * @param {Array[HTMLElement]} elements
 */
function AbeAnimate(element1, element2, element3){
    this._elems = new Array();
    this._size = 0;
    for (var i = 0; i < arguments.length; i++) 
        this._elems.push(arguments[i]);
    if (this._checkArgs() === false) 
        throw 'bad argument';
    
    this._ele = this._elems[0];
    this._aniID;
    this._slideHeight = null;
    this._funcBack = null;
    this._aniStep = 1;
    this._curHeight;
    
    this._origValue;
    this._curValue;
    this._srcX, this._srcY, this._destX, this._destY, this._deltaX, this._deltaY;
    this._srcW, this._srcH, this._destW, this._destH, this._deltaW, this._deltaH;
    
    
}

if (typeof window.createDelegate === 'undefined') {
    window.createDelegate = function(instance, method){
        return function(){
            method.apply(instance, arguments);
        }
    }
}
AbeAnimate.prototype = {
    /**
     * public functions
     */
    /***
     *
     * @param {Number} speed
     * @param {Number} step
     * @param {Function} callBack
     */
    slideDown: function(speed, step, callBack){
        var spd = ((speed == null || typeof speed != 'number' || speed < 1) ? 50 : speed);
        this._aniStep = ((step == null || typeof step != 'number' || step < 1) ? 1 : step);
        this._slideHeight = this._ele.getAttribute('this._slideHeight');
        if (this._slideHeight == null) {
            this._slideHeight = this._ele.offsetHeight;
            if (this._slideHeight < 10) 
                this._slideHeight = 25;
            this._ele.setAttribute('this._slideHeight', this._slideHeight);
        }
        this._ele.style.height = "0px";
        this._ele.style.display = "block";
        this._curHeight = 0;
        this._funcBack = callBack;
        this._aniID = setInterval(createDelegate(this, this._doSlideDown), spd);
    },
    
    /**
     *
     * @param {Number} speed
     * @param {Number} step
     * @param {Function} callBack
     */
    slideUp: function(speed, step, callBack){
        var spd = ((speed == null || typeof speed != 'number' || speed < 1) ? 50 : speed);
        this._aniStep = ((step == null || typeof step != 'number' || step < 1) ? 1 : step);
        this._slideHeight = this._ele.getAttribute('this._slideHeight');
        if (this._slideHeight == null) {
            this._slideHeight = this._ele.offsetHeight;
            this._ele.setAttribute('this._slideHeight', this._slideHeight);
        }
        this._ele.style.height = this._slideHeight + "px";
        this._ele.style.display = "block";
        this._curHeight = this._slideHeight;
        this._funcBack = callBack;
        this._aniID = setInterval(createDelegate(this, this._doSlideUp), spd);
    },
    /**
     *
     * @param {Number} value
     */
    setOpacity: function(value){
        this._setOpacity(value);
        this._ele.setAttribute('Opacity', value);
        return this;
    },
    /**
     *
     * @param {Number} speed
     * @param {Number} step
     * @param {Function} callBack
     * @param {Number} Opacity
     */
    fadeOut: function(speed, step, callBack, Opacity){
        var spd = ((typeof speed != 'number' || speed == null || speed < 1) ? 50 : speed);
        this._aniStep = ((typeof step != 'number' || step == null || step < 1 || step > 100) ? 3 : step);
        this._curValue = this._ele.getAttribute('Opacity');
        if (this._curValue == null) {
            this._curValue = ((typeof Opacity != 'number' || Opacity == null || Opacity < 1 || Opacity > 100) ? 100 : Opacity);
        }
        this._origValue = this._curValue;
        this._setOpacity(this._curValue);
        for (var i = 0; i < this._size; i++) 
            this._elems[i].style.display = "block";
        this._funcBack = callBack;
        this._aniID = setInterval(createDelegate(this, this._doFadeOut), spd);
    },
    /**
     *
     * @param {Number} speed
     * @param {Number} step
     * @param {Function} callBack
     * @param {Number} Opacity
     */
    fadeIn: function(speed, step, callBack, Opacity){
        var spd = ((typeof speed != 'number' || speed == null || speed < 1) ? 50 : speed);
        this._aniStep = ((typeof step != 'number' || step == null || step < 1 || step > 100) ? 3 : step);
        this._origValue = this._ele.getAttribute('Opacity');
        if (this._origValue == null) {
            this._origValue = ((typeof Opacity != 'number' || Opacity == null || Opacity < 1 || Opacity > 100) ? 100 : Opacity);
        }
        this._curValue = 0;
        this._setOpacity(0);
        for (var i = 0; i < this._size; i++) {
            //debug.print(this._elems[i]);
            this._elems[i].style.display = "block";
        }
        
        this._funcBack = callBack;
        this._aniID = setInterval(createDelegate(this, this._doFadeIn), spd);
    },
    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} speed
     * @param {Number} step
     * @param {Function} callBack
     */
    moveTo: function(x, y, speed, step, callBack){
        this._destX = x;
        this._destY = y;
        if (typeof this._destX == 'undefined' || this._destX == null || typeof this._destY == 'undefined' || this._destY == null) 
            return;
        var spd = ((typeof speed != 'number' || speed == null || speed < 1) ? 50 : speed);
        this._aniStep = ((typeof step != 'number' || step == null || step < 1 || step > 100) ? 5 : step);
        this._srcX = this._ele.offsetLeft;
        this._srcY = this._ele.offsetTop;
        var a = this._destX - this._srcX;
        var b = this._destY - this._srcY;
        if (a == 0 && b == 0) {
            if (typeof callBack != 'undefined' && callBack != null) 
                callBack();
            return;
        }
        var c = Math.sqrt(a * a + b * b);
        var sinA = b / c;
        var cosA = a / c;
        this._deltaX = this._aniStep * cosA;
        this._deltaY = this._aniStep * sinA;
        this._funcBack = callBack;
        this._aniID = setInterval(createDelegate(this, this._doMoveTo), spd);
    },
    /**
     *
     * @param {Number} width
     * @param {Number} height
     * @param {Number} speed
     * @param {Number} step
     * @param {Function} callBack
     */
    SizeTo: function(width, height, speed, step, callBack){
        this._destW = width;
        this._destH = height;
        if (typeof this._destW == 'undefined' || this._destW == null || typeof this._destH == 'undefined' || this._destH == null) 
            return;
        var spd = ((typeof speed != 'number' || speed == null || speed < 1) ? 50 : speed);
        this._aniStep = ((typeof step != 'number' || step == null || step < 1 || step > 100) ? 5 : step);
        this._srcW = this._ele.offsetWidth;
        this._srcH = this._ele.offsetHeight;
        var a = this._destW - this._srcW;
        var b = this._destH - this._srcH;
        if (a == 0 && b == 0) {
            if (typeof callBack != 'undefined' && callBack != null) 
                callBack();
            return;
        }
        var c = Math.sqrt(a * a + b * b);
        var sinA = b / c;
        var cosA = a / c;
        this._deltaW = this._aniStep * cosA;
        this._deltaH = this._aniStep * sinA;
        this._funcBack = callBack;
        this._aniID = setInterval(createDelegate(this, this._doSizeTo), spd);
    },
    
    /**
     * private functions
     */
    /**
     * @private
     */
    _checkArgs: function(){
        this._size = this._elems.length;
        if (this._size < 1) 
            return false;
        for (var i = 0; i < this._size; i++) 
            if (typeof this._elems[i] === 'undefined' || this._elems[i] === null) 
                return false;
        return true;
    },
    _doSlideUp: function(){
        this._curHeight -= this._aniStep;
        if (this._curHeight <= 0) {
            this._ele.style.height = "0px"
            this._ele.style.display = 'none';
            this._aniID = clearInterval(this._aniID);
            if (this._funcBack != null && typeof this._funcBack != 'undefined') 
                this._funcBack();
        }
        else {
            this._ele.style.height = this._curHeight + "px";
        }
    },
    /**
     * @private
     */
    _doSlideDown: function(){
        this._curHeight += this._aniStep;
        if (this._curHeight >= this._slideHeight) {
            this._ele.style.height = this._slideHeight + "px"
            this._aniID = clearInterval(this._aniID);
            if (this._funcBack !== null && typeof this._funcBack !== 'undefined') 
                this._funcBack();
        }
        else {
            this._ele.style.height = this._curHeight + "px";
        }
    },
    /**
     * @private
     */
    _setOpacity: function(value){
        if (typeof this._ele.style.filter !== 'undefined') {
            for (var i = 0; i < this._size; i++) 
                this._elems[i].style.filter = "alpha(opacity=" + value + ")";
        }
        else {
            for (var i = 0; i < this._size; i++) 
                this._elems[i].style.opacity = value / 100;
        }
    },
    /**
     * @private
     */
    _doFadeOut: function(){
        this._curValue -= this._aniStep;
        if (this._curValue <= 0) {
            for (var i = 0; i < this._size; i++) 
                this._elems[i].style.display = 'none';
            this._setOpacity(this._origValue);
            this._aniID = clearInterval(this._aniID);
            if (this._funcBack !== null && typeof this._funcBack !== 'undefined') 
                this._funcBack();
        }
        else {
            this._setOpacity(this._curValue);
        }
    },
    /**
     * @private
     */
    _doFadeIn: function(){
        this._curValue += this._aniStep;
        if (this._curValue >= this._origValue) {
            this._setOpacity(this._origValue);
            this._aniID = clearInterval(this._aniID);
            if (this._funcBack !== null && typeof this._funcBack !== 'undefined') 
                this._funcBack();
        }
        else {
            this._setOpacity(this._curValue);
        }
    },
    /**
     * @private
     */
    _doMoveTo: function(){
        this._srcX += this._deltaX;
        this._srcY += this._deltaY;
        var a = this._srcX - this._destX;
        var b = this._srcY - this._destY;
        if (Math.sqrt(a * a + b * b) <= 10) {
            this._setPos(this._destX, this._destY);
            this._aniID = clearInterval(this._aniID);
            if (this._funcBack !== null && typeof this._funcBack !== 'undefined') 
                this._funcBack();
        }
        else {
            this._setPos(this._srcX, this._srcY);
        }
    },
    /**
     * @private
     */
    _setPos: function(x, y){
        this._ele.style.left = x + "px";
        this._ele.style.top = y + "px";
    },
    /**
     * @private
     */
    _doSizeTo: function(){
        this._srcW += this._deltaW;
        this._srcH += this._deltaH;
        var a = this._srcW - this._destW;
        var b = this._srcH - this._destH;
        if (Math.sqrt(a * a + b * b) <= 10) {
            this._setSize(this._destW, this._destH);
            this._aniID = clearInterval(this._aniID);
            if (this._funcBack !== null && typeof this._funcBack !== 'undefined') 
                this._funcBack();
        }
        else {
            this._setSize(this._srcW, this._srcH);
        }
    },
    /**
     * @private
     */
    _setSize: function(width, height){
        this._ele.style.width = width + 'px';
        this._ele.style.height = height + 'px';
    }
}

var AbeViewer = function(parentId, images){
    /*images:json数组,如[{'title':'Hello World',
     'url':'http://...','href':'http://...'},{}]
     可以为空，如果为空，需要调用loadImages方法
     */
    var parent = $(parentId);
    if (parent == null) {
        throw "parent not found";
        return;
    }
    
    parent.style.overflow = 'hidden';
    var imgs = images;
    /*
     if(typeof imgs=='undefined' || imgs==null){
     
     }
     */
    var me = this;
    this.width = parent.offsetWidth;
    this.height = parent.offsetHeight;
    //console.log(this.width+" ; "+this.height);
    var imgContainer = document.createElement('div');
    imgContainer.className = 'abe_viewer_img';
    with (imgContainer.style) {
        position = 'absolute';
        width = this.width + "px";
        height = this.height + "px";
        overflow = 'hidden';
        zIndex = '1';
    }
    var imgTitle = document.createElement('div');
    imgTitle.className = 'abe_viewer_title';
    imgTitle.setAttribute('slideHeight', 30);
    with (imgTitle.style) {
        position = 'absolute';
        width = this.width + "px";
        display = 'block';
        left = '0px';
        top = '-34px';
        overflow = 'hidden';
        zIndex = '2';
    }
    new AbeAnimate(imgTitle).setOpacity(60);
    parent.appendChild(imgContainer);
    parent.appendChild(imgTitle);
    AddEvent(parent, 'click', function(e){
        onMouseClick(curID);
    });
    
    AddEvent(parent, 'mouseout', function(e){
        var ev = e || window.event;
        var rt = ev.relatedTarget;
        onMouseOut(rt);
    });
    
    AddEvent(parent, 'mouseover', function(e){
        var ev = e || window.event;
        var src = ev.srcElement || ev.target;
        onMouseOver(curID, ev.relatedTarget);
    });
    var curID = 0;
    var imgBuffer = new Array();
    var size = 0;
    if (typeof imgs == 'undefined' || imgs == null || typeof imgs.length == 'undefined' || (!imgs.length)) {
        imgs = null;
    }
    else 
        initImgs();
    var paused = false;
    var showID;
    var autoTitle = false;
    var curIndex = 0;
    this.beginShow = function(autoShowTitle){
        if (imgs == null) 
            throw 'images not initilized';
        if (typeof autoTitle != 'boolean') 
            autoTitle = false;
        else 
            autoTitle = autoShowTitle;
        //
        curIndex = 1;
        imgBuffer[0].style.display = 'block';
        //setTimeout(show)
        showID = setInterval(show, 3000);
    }
    
    
    function show(){
        if (paused) 
            return;
        var preIndex = (curIndex == 0 ? imgs.length - 1 : curIndex - 1);
        if (autoTitle) {
            try {
            
                new AbeAnimate(imgTitle).moveTo(0, -34, null, null, function(){
                
                    new AbeAnimate(imgBuffer[preIndex]).fadeOut(40, 10); // .style.display = 'none';
                    new AbeAnimate(imgBuffer[curIndex]).fadeIn(30, 5, function(){
                        imgTitle.innerHTML = imgs[curIndex].title;
                        new AbeAnimate(imgTitle).moveTo(0, 0);
                        curID = curIndex;
                        if (curIndex == imgs.length - 1) 
                            curIndex = 0;
                        else 
                            curIndex++;
                    });//.style.display = 'block';
                });
            } 
            catch (e) {
                console.log(e.message);
            }
            
        }
        
        else {
            new AbeAnimate(imgBuffer[preIndex]).fadeOut(40, 10); // .style.display = 'none';
            new AbeAnimate(imgBuffer[curIndex]).fadeIn(30, 5);
            
            curID = curIndex;
            if (curIndex == imgs.length - 1) 
                curIndex = 0;
            else 
                curIndex++;
        }
    }
    this.loadImages = function(images){
        imgs = images;
        if (typeof imgs == 'undefined' || imgs == null || typeof imgs.length == 'undefined' || (!imgs.length)) {
            throw "bad image info";
        }
        initImgs();
    }
    function initImgs(){
        size = imgs.length;
        var bili1 = me.width / me.height;
        if (size > 0) {
            for (var i = 0; i < size; i++) {
                var tmp = document.createElement('img');
                tmp.id = i;
                var w, h, l, t;//width,height,left,top
                var bl = imgs[i].bili;
                if (bl <= bili1) {
                    h = me.height;
                    w = h * bl;
                    t = 0;
                    l = (me.width - w) / 2
                }
                else {
                    w = me.width;
                    h = w / bl;
                    l = 0;
                    t = (me.height - h) / 2
                }
                
                with (tmp.style) {
                    position = 'absolute';
                    width = w + "px";
                    height = h + "px";
                    left = l + "px";
                    top = t + 'px';
                    display = 'none';
                }
                
                
                
                tmp.src = imgs[i].url;
                imgContainer.appendChild(tmp);
                imgBuffer.push(tmp);
            }
        }
    }
    function downTitle(id){
        imgTitle.innerHTML = imgs[id].title;
        new AbeAnimate(imgTitle).setOpacity(70).moveTo(0, 0);//.slideDown(null, 5);
    }
    function onMouseOver(id, rt){
        if (autoTitle) 
            return;
        if (rt == imgTitle) 
            return;
        
        for (var i = 0; i < size; i++) {
            if (rt == imgBuffer[i]) 
                return;
        }
        downTitle(id);
        paused = true;
    }
    function onMouseOut(rt){
        if (autoTitle) 
            return;
        if (rt == imgTitle) 
            return;
        for (var i = 0; i < size; i++) {
            if (rt == imgBuffer[i]) {
                return;
            }
        }
        
        new AbeAnimate(imgTitle).moveTo(0, -34, null, null, function(){
            paused = false;
        });
        
    }
    function onMouseClick(id){
        console.log(id);
    }
}
