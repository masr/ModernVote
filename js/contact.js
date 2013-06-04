/*
 *移动元素
 *Author:Abraham
 */
function Move(title, panel){
    var title = title;
    var panel = panel;
    this.pageX = function(elem){ //获取目标elem的X坐标 
        return elem.offsetParent ? //如果能继续得到上一个元素，增加当前的偏移量并继续向上递归 
 elem.offsetLeft + this.pageX(elem.offsetParent) : elem.offsetLeft;
    }
    this.pageY = function(elem){ //获取目标elem的Y坐标 
        return elem.offsetParent ? elem.offsetTop + this.pageX(elem.offsetParent) : elem.offsetTop;
    }
    this.makeMovable = function(){
        var oldXY = null;
        var newXY = null;
        var x = 0; //记录初始化是目标elem的x坐标 
        var y = 0; //记录初始化是目标elem的y坐标 
        var t = this;
        title.style.cursor = "move";
        title.onmousedown = function(e){
            e = e || window.event;
            panel.style.position = "absolute";
            x = t.pageX(panel);
            //alert(x);
            y = t.pageY(panel);
            oldXY = {
                x: e.clientX,
                y: e.clientY
            }; //获取鼠标在按下的时候的坐标 
            document.onmousemove = function(e){
                e = e || window.event;
                newXY = {
                    x: e.clientX,
                    y: e.clientY
                }; //获取鼠标在移动过程中的坐标 
                panel.style.left = (newXY.x - oldXY.x + x) + "px";
                panel.style.top = (newXY.y - oldXY.y + y) + "px";
            }
        }
        title.onmouseup = function(e){
            document.onmousemove = function(e){ //在放开鼠标的时候覆盖掉mousemove事件函数 
                return;
            }
        }
    }
}

function dealFigure(figure){
    var rtn = figure.substring(12);
    rtn = rtn.replace(/p\d+/, function(match){
        return match.substring(1);
    });
    return rtn;
}

window.onload = function(){



    dialog = get$('msgDialog');
    dtitle = get$('dTitle');
    dname = get$('dName');
    dun = get$('dUsername');
    dum = get$('dUsermsg');
    dmask = get$('mask');
    curPlayer = null;
    AddEvent(dun, 'focus', function(){
        dun.select();
    });
    AddEvent(dun, 'keydown', function(event){
        if (event.keyCode === 13) {
            sendMsg();
        }
    });
    AddEvent(dum, 'focus', function(){
        dum.select();
    });
    AddEvent(dum, 'keydown', function(event){
        if (event.keyCode === 13) {
            sendMsg();
        }
    });
    var m = new Move(dtitle, dialog);
    m.makeMovable();
    
    
    getRank();
    //var i=eval('({id:23})');
    //alert(i.id);
}
function getRandomPlayers(){
    var t = [];
    for (var id in players) {
        //debug.print(typeof id)
        if (!id.match(/^\d+$/)) 
            continue;
        t.push(players[id]);
    }
    var len = t.length;
    
    for (var i = 0; i < len; i++) {
        var num1 = Math.floor(Math.random() * len);
        var num2 = num1;
        while (num2 === num1) 
            num2 = Math.floor(Math.random() * len);
        var tmp = t[num1];
        t[num1] = t[num2];
        t[num2] = tmp;
    }
    return t;
}

function getRank(){
    try {
        XMLHttp.sendRequest('POST', 'rank.php', '', dealRank);
    } 
    catch (e) {
        debug.print(e.message)
    };
    //setTimeout(getRank,10000);
}

function dealRank(xmlhttp){
    if (xmlhttp.status === 200 || xmlhttp.status === 0) {
        //debug.print(xmlhttp.responseText);
        var ranks = eval("(" + xmlhttp.responseText + ")");
        //debug.print(ranks);
        for (var id in ranks) {
            //debug.print(typeof id)
            if (!id.match(/^\d+$/)) 
                continue;
            var p = players[id];
            var r = ranks[id];
            
            
            get$('rank' + id).innerHTML = "目前：" + r.up_count + "票，排名:" + r.rank;
            
        }
    }
	setTimeout(getRank,3000);
}

function showDialog(id){
    curPlayer = players[id];
    var p = curPlayer;
    dname.innerHTML = p.name;
    dname.setAttribute('href', p.link);
    dun.value = 'Ta';
    dum.value = '';
    dmask.style.display = 'block';
    Abe$(dialog).fadeIn(30, 10, function(){
        dun.focus();
    });
}

function hideDialog(status){
    Abe$(dialog).fadeOut(20, 10, function(){
        dmask.style.display = 'none';
        if (status) {
            alert('评论成功！');
        }
    });
    
}

function vote_to(id){
    showDialog(id);

	if(confirm('确定投给'+players[id].name+'一票？','投票')==true)
    	XMLHttp.sendRequest('POST', 'vote_validate.php', 'voteid=' + id, dealVote);
}

function dealVote(xmlhttp){
    if (xmlhttp.status === 200 || xmlhttp.status === 0) {
        var results = xmlhttp.responseText.split(',');
        var id = results[0].trim();
            get$('rank' + id).innerHTML = "目前：" + results[1] + "票，排名:" + results[2];
            showDialog(id);
      
    }
}

function sendMsg(){
    var name = get$('dUsername').value;
    var msg = get$('dUsermsg').value;
    if (!name || name == '') {
		alert('对不起，昵称不能为空。');
		get$('dUsername').focus();
		return;
	}
	if(name.length>10){
		alert('对不起，昵称长度不能超过10个字符。');
		get$('dUsername').focus();
		return;
	}
    if (!msg || msg == '') {
		alert('对不起， 祝福不能为空。');
		get$('dUsermsg').focus();
		return;
	}
  
	if(msg.length>100){
		alert('对不起，祝福长度不能超过100个字符。');
		get$('dUsermsg').focus();
		return;
	}
    var content = 'voteid=' + curPlayer.id + '&message=' + msg + '&name=' + name;
    XMLHttp.sendRequest('POST', 'comment.php', content, dealSend);
    
}

function dealSend(xmlhttp){
    var status = false;
    if (xmlhttp.status === 200 || xmlhttp.status === 0) {
        if (xmlhttp.responseText.trim() == 'success') 
            status = true;
    }
    hideDialog(status);
}
