<?php
function exist_cookie($cookie)
{
	global $_SGLOBAL;
	  $_SGLOBAL['db']->query("select ck_id from user_cookie where cookie='$cookie'");
	  return $_SGLOBAL['db']->affected_rows()!=0;
	
}

function exist_vote_id($voteid)
{
		return $voteid>=1 && $voteid<=20;
}

function can_vote($cookie,$voteid)
{
	global $_SGLOBAL;
  $an_hour_ago=get_time()-3600*5;
  $_SGLOBAL['db']->query("select vl_id from vote_log where cookie='$cookie' and time>$an_hour_ago  and voteid=$voteid");
   return ($_SGLOBAL['db']->affected_rows()==0);

}



function vote($voteid)
{
	global $_SGLOBAL;
	$_SGLOBAL['db']->query("update vote_option set up_count=up_count+1 where vop_id=$voteid");
}

function update_remark_count($voteid)
{
	global $_SGLOBAL;
	     $_SGLOBAL['db']->query("update vote_option set remark_count=remark_count+1 where vop_id=$voteid ");
	
}

function saddslashes($string) {
	if(is_array($string)) {
		foreach($string as $key => $val) {
			$string[$key] = saddslashes($val);
		}
	} else {
		$string = addslashes($string);
	}
	return $string;
}

function shtmlspecialchars($string) {
	if(is_array($string)) {
		foreach($string as $key => $val) {
			$string[$key] = shtmlspecialchars($val);
		}
	} else {
		$string = preg_replace('/&amp;((#(\d{3,5}|x[a-fA-F0-9]{4})|[a-zA-Z][a-z0-9]{2,5});)/', '&\\1',
			str_replace(array('&', '"', '<', '>'), array('&amp;', '&quot;', '&lt;', '&gt;'), $string));
	}
	return $string;
}

function insert_vote_log($cookie,$voteid)
{
		global $_SGLOBAL;
		$time=get_time();
		$ip=get_IP();
	$_SGLOBAL['db']->query("insert into vote_log (cookie,time,ip,voteid) values('$cookie',$time,'$ip',$voteid)");
}


function get_IP()
{
	$ip = ($_SERVER["HTTP_VIA"]) ? $_SERVER["HTTP_X_FORWARDED_FOR"] : $_SERVER["REMOTE_ADDR"];
$ip = ($ip) ? $ip : $_SERVER["REMOTE_ADDR"]; 
return $ip;
}







function insert_cookie($cookie)
{
	global $_SGLOBAL;
	$query=$_SGLOBAL['db']->query("insert into user_cookie (cookie) values('$cookie')");
	
}

function dbconnect() {
	global $_SGLOBAL, $_SC;

	include_once(SM_ROOT.'source/class_mysql.php');

	if(empty($_SGLOBAL['db'])) {
		$_SGLOBAL['db'] = new dbstuff;
		$_SGLOBAL['db']->charset = $_SC['dbcharset'];
		$_SGLOBAL['db']->connect($_SC['dbhost'], $_SC['dbuser'], $_SC['dbpw'], $_SC['dbname'], $_SC['pconnect']);
	   $_SGLOBAL['db']->query("set names utf8");
	}
}

function ssetcookie($var, $value, $life=0) {
	global $_SGLOBAL, $_SC, $_SERVER;
	setcookie($var, $value, $life?(get_time()+$life):0, $_SC['cookiepath'], $_SC['cookiedomain'], $_SERVER['SERVER_PORT']==443?1:0);
}


	
	function get_datetime($time)
	{
		
		$date=date('m-d H:i',$time);
		return $date;

	}
	
	 function has_new_feed($current_id)
 {
 	global $_SGLOBAL;
 	$_SGLOBAL['db']->query("select f_id from comment where f_type=".COMMENT_VOTE_TYPE." and cmt_id>".$current_id);
 	return ($_SGLOBAL['db']->affected_rows()>=1);
 }
 
 
function get_time()
{
 $time=time();
return $time;
}
 

 
 

 


?>