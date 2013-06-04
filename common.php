<?php
date_default_timezone_set("Asia/Hong_Kong");
$_SGLOBAL=$_SC=array();
define('D_BUG', '0');
D_BUG?error_reporting(7):error_reporting(0);
define("COMMENT_VOTE_TYPE",0);
define("COMMENT_MESSAGE_TYPE",1);

define('SM_ROOT', dirname(__FILE__).DIRECTORY_SEPARATOR);

include_once(SM_ROOT.'config.php');
include_once SM_ROOT.'source/my_function.php';
include_once SM_ROOT."source/fetch_function.php";

$_COOKIE=shtmlspecialchars(saddslashes($_COOKIE));
$_GET=shtmlspecialchars(saddslashes($_GET));
$_POST=shtmlspecialchars(saddslashes($_POST));

dbconnect() ;

if (empty($_COOKIE['user']))
{
	$id=get_max_ckId();
	$str=md5($id.rand(0,1000000));
	ssetcookie("user",$str,99999999);
	insert_cookie($str);
	
}
else
{
	if (!exist_cookie($_COOKIE['user']))
	{
		insert_cookie($_COOKIE['user']);
	}
}

  
?>
