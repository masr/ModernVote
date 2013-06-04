<?php
include_once './common.php';


if (empty($_COOKIE['user'])||empty($_POST['voteid']))
{
echo "-1" ;
 exit();
}
   
 $cookie=$_COOKIE['user'];
 $voteid=intval($_POST['voteid']);

 
 
 if(!exist_cookie($cookie) || !exist_vote_id($voteid))
 {
echo "-1" ;
 exit();
}

    if (!can_vote($cookie,$voteid))
    {
    	 echo "-1" ;
    	  exit();
    }
      
      insert_vote_log($cookie,$voteid);
       
?>