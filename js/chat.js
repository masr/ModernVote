function getTest(){
    getMessage();
}

function sendMsg(){
	if(_timeout===true){
		alert('由于长时间未发言，系统已自动断开连接，不能发送信息。请刷新网页重试。');
		 appendMsg({
            username: '系统提示',
            message: '由于长时间未发言，系统已自动断开连接，不能发送信息。请刷新网页重试。',
            vtime: ''
        });
		return;
	}
    if (userName == '') {
        alert('请先输入你的昵称!');
        uname.focus();
        return;
    }
	var editor=$('#editor1');
    var msg = editor.val();
	//debug.print(msg);
	//debug.print(msg.replace(/<.+>/g,'').replace(/&nbsp/g,''))
    if (msg.replace(/<[^<>]+>/g,'').replace(/&nbsp[;]/g,'').replace(/\s+/g,'')=='') {
        alert('信息不能为空！');
        return;
    }
    var data = 'username=' + encodeURIComponent(userName) + "&message=" + encodeURIComponent(msg);
    XMLHttp.sendRequest('POST', 'chatSend.php', data, sendBack);
   	editor.val('');
}

function sendBack(xmlhttp){
    if (xmlhttp.status === 200 || xmlhttp.status === 0) {
        var rtn = xmlhttp.responseText.split(',');
        _do = true;
        if (rtn[0] == '0') {
            appendMsg({
                username: '系统提示',
                message: '你刚才的信息发送失败，可能是网络问题，请重试',
                vtime: ''
            });
            return;
        }
        
        //var msg=eval('('+xmlhttp.responseText+')');
        //debug.print(msg);
        //appendMsg(msg);
    }
    else {
        appendMsg({
            username: '系统提示',
            message: '你刚才的信息发送失败，可能是网络问题，请重试',
            vtime: ''
        });
    }
}

var curTime = 0;
function getMessage(){
    XMLHttp.sendRequest('POST', 'chatGet.php', 'time=' + curTime, getBack);
    
}

var cb = null;
function appendMsg(msg){
    var d = document.createElement('div');
    d.className = 'eachMsg';
    d.innerHTML = '<div class="eachName">' + msg.username + ' ' + msg.vtime + '</div><div class="eachContent">' + msg.message + '</div>';
    cb.appendChild(d);
    
}

function getBack(xmlhttp){
    if (xmlhttp.status === 200 || xmlhttp.status === 0) {
        var msgs = eval('(' + xmlhttp.responseText + ')');
        var i = 0;
        var end = msgs.length;
        var t = 3000;
        if (end > 0) {
            for (i = end - 1; i >= 0; i--) {
                appendMsg(msgs[i]);
            }
            curTime = msgs[0].time;
            debug.print(curTime);
            cb.scrollTop = cb.scrollHeight;
            t = 0;
        }
        if (_timeout === false) 
            setTimeout(getMessage, t);
        else {
            appendMsg({
                username: '系统提示',
                message: '由于长时间未发言，系统已自动断开连接。请刷新网页以查看最新消息。',
                vtime: ''
            });
        }
    }
    else {
        appendMsg({
            username: '系统提示',
            message: '网络出现错误，请刷新网页以重试。',
            vtime: ''
        });
    }
}

var ENTER = 0;
var CTRLENTER = 1;
var sendMode = ENTER;
function dealEditorKey(ev){

    if (ev.data.keyCode == 13) {
        if (sendMode == ENTER) {
            sendMsg();
            ev.cancel();
        }
    }
    else 
        if (ev.data.keyCode == CKEDITOR.CTRL + 13) {
            if (sendMode == CTRLENTER) {
                sendMsg();
                ev.cancel();
            }
            else {
                ev.data.keyCode = 13;
            }
        }
    
    
}

var _do = false;
var _t = 0;
var _timeout = false;
var _ti = null;
function checkTimeOut(){
    if (_do == true) {
        _t = 0;
        _do = false;
    }
    else {
        _t++;
    }
    if (_t >= 300) {
        _timeout = true;
        clearInterval(_ti);
        appendMsg({
            username: '系统提示',
            message: '由于长时间未发言，系统已自动断开连接。请刷新网页以查看最新消息。',
            vtime: ''
        });
    }
}

var uname = null;
var userName = '';
window.onload = function(){
    cb = get$('chatBoard')
    uname = get$('uname');
	userName=uname.value;
	if(userName!=''&& userName!=='在此处输入你的昵称'){
		uname.style.fontStyle = 'normal';
        uname.style.color = 'black';
	}else{
		userName='';
	}
    uname.onblur = function(){
        userName = uname.value.trim();
        if (userName == '') {
            uname.value = '在此处输入你的昵称';
            uname.style.fontStyle = 'italic';
            uname.style.color = 'gray';
        }
    }
    uname.onfocus = function(){
    
        uname.style.fontStyle = 'normal';
        uname.style.color = 'black';
        if (uname.value.trim() == '在此处输入你的昵称') {
            uname.value = '';
        }
        else {
            uname.select();
        }
        
    }
    _ti = setInterval(checkTimeOut, 1000);
    getMessage();
    
}

function get$(id){
    return document.getElementById(id);
}

String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}


function _XmlHttpRequestManager(){
    this.XMLHttpRequestPool = new Array();
}

_XmlHttpRequestManager.prototype = {
    getInstance: function(){
        var i = 0;
        //查找XMLHttpRequest对象池中空闲的对象
        for (i = 0; i < this.XMLHttpRequestPool.length; i++) {
            if (this.XMLHttpRequestPool[i].readyState == 4 || this.XMLHttpRequestPool[i].readyState == 0) {
                return this.XMLHttpRequestPool[i];
            }
        }
        //如果没有，创建一个新的
        this.XMLHttpRequestPool[i] = this.createRequest();
        return this.XMLHttpRequestPool[i];
    },
    //创建XMLHttpRequest对象，暂时只考虑FF3+,IE7+
    createRequest: function(){
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } 
            catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } 
                catch (e1) {
                    return null;
                }
            }
        }
        else 
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            }
            else {
                alert('xmlhttp 创建失败');
                return null;
            }
        
    },
    sendRequest: function(method, url, data, callBack){
        var objXmlHttp = this.getInstance();
        with (objXmlHttp) {
            try {
                open(method, url, true);
                if (method == "GET") {
                    //对Get方法，增加一个额外的随机数参数，防止IE缓存服务器响应
                    if (url.indexOf("?") > 0) {
                        url += "&randnum=" + Math.random();
                    }
                    else {
                        url += "?randnum=" + Math.random();
                    }
                    send(null);
                }
                else 
                    if (method == "POST") {
                        setRequestHeader("Content-Length", data.length);
                        setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        send(data);
                    }
                onreadystatechange = function(){
                    if (objXmlHttp.readyState == 4) {
                        if (typeof callBack === 'function' && callBack !== null) 
                            callBack(objXmlHttp);
                    }
                }
                
            } 
            catch (e) {
                alert(e);
            }
        }
    }
}

//创建XMLHttpRequest对象池
XMLHttp = new _XmlHttpRequestManager();


var debug = {
    print: function(msg){
        if (typeof console != 'undefined') {
            console.log(msg)
        }
    },
    msgbox: function(msg){
        if (typeof msg === 'object') {
            var newmsg = '{ ';
            for (var k in msg) {
                if (typeof msg[k] !== 'function') 
                    newmsg += (k + '=' + msg[k] + ' ');
            }
            newmsg += '}';
            alert(newmsg);
        }
        else 
            alert(msg);
    },
    assert: function(expression){
        console.assert(expression);
    }
}
