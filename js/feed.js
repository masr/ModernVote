/**
 * @author Abraham
 * Email:abraham1@163.com
 */
var latestId = -1;
function getHTML(feed){
    var p = players[feed.id];
    var rtn = "<div class='player_img'>";
    rtn += "<img class='figure' onclick='window.open(\""+p.link+"\");' src='" + p.little_figure + "'/></div> <div class='player_msg'>";
    rtn += "<a target='black' href='" + p.link + "'>" + p.name + "</a>收到" + feed.from + "的一张投票，" + feed.from + "还说:<br><span class='player_say'>";
    rtn += feed.say + "</span></div><div class='player_time'>";
    rtn += feed.created_at + "</div>";
  
	//debug.print(rtn);
	return rtn;
}
function dealFeed(xmlhttp){
    if (xmlhttp.status === 200 || xmlhttp.status === 0) {
        //debug.print(xmlhttp.responseText);
        var feeds = eval('(' + xmlhttp.responseText + ')');
        var len = feeds.length;
        if (len > 0 && len < 7) {
            for (var i = 6; i > len; i--) {
                get$('fi' + i).innerHTML = get$('fi' + (i - len)).innerHTML;
            }
            for (var i = 1; i <= len; i++) {
                get$('fi' + i).innerHTML = getHTML(feeds[i-1]);
            }
			latestId=feeds[0].feed_id;
        }
    }
}

function getFeed(){
		try{
			  XMLHttp.sendRequest('POST', 'new_feed.php', 'curid='+latestId.toString(), dealFeed);
		}	catch(e){debug.print(e.message)};
	setTimeout(getFeed,10000);
}

window.onload = function(){
	
 
 
 AddEvent(get$('message_box'),'focus',function(event){
 	if(event.sender.value=='来留个言吧……'){
		event.sender.value='';

	}
	event.sender.select();
	event.sender.focus();
 });
  AddEvent(get$('message_box'),'blur',function(event){
 	if(event.sender.value==''){
		event.sender.value='来留个言吧……';
	}
 });
if(!navigator.appVersion.match(/MSIE\s*6/)){
	get$('hint').style.display='none';
}
}




function sendMsg(){
	var content=get$('message_box').value.trim();
	if(!content||content==''||content=='来留个言吧……'){
		alert('请输入你的留言!');
		get$('message_box').focus();
				return;
	}
if(content.length>100){
	alert('留言长度不能超过100!');
	return;
}
	XMLHttp.sendRequest('POST','message.php','content='+content,dealSMsg);
	get$('message_box').value="";
	
}
function dealSMsg(xmlhttp){
	 if (xmlhttp.status === 200 || xmlhttp.status === 0) {
	 	get$('msg').innerHTML=xmlhttp.responseText;
	 }else{
	 	alert('评论失败，请重试.');
	 }
}
