<?php
include_once './common.php';


   function insert_comment()
 {
 	global $_SGLOBAL,$message,$voteid,$type,$time,$cookie,$name;
 	     $_SGLOBAL['db']->query("insert into comment (content,f_id,f_type,created_at,cookie,name) 
     values('$message',$voteid,$type,$time,'$cookie','$name')");
 }

  if (empty($_COOKIE['user'])|| empty($_POST['voteid']) || empty($_POST['message']))
     exit();
  
  
  $cookie=$_COOKIE['user'];
  $voteid=intval($_POST['voteid']);
  $message=$_POST['message'];
  $type=COMMENT_VOTE_TYPE;
  $time=get_time();
  $name=$_POST['name'];
  

  
  if (!exist_cookie($cookie) || !exist_vote_id($voteid))
     exit();


     
    insert_comment();
     update_remark_count($voteid);


 echo 'success';

?>