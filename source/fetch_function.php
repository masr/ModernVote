<?php


function get_max_ckId()
{
	global $_SGLOBAL;
	
	$query=$_SGLOBAL['db']->query("select max(ck_id) from user_cookie");	
	$value=$_SGLOBAL['db']->fetch_array($query);
	return $value['max(ck_id)'];
}
  
  
   function get_feeds($current_id)
 {
 	global $_SGLOBAL;
 	    if ($current_id==-1)
 	$results=$_SGLOBAL['db']->query("select * from comment where f_type=".COMMENT_VOTE_TYPE." order by cmt_id desc limit 6" );
 	 	else
 	 	$results=$_SGLOBAL['db']->query("select * from comment where f_type=".COMMENT_VOTE_TYPE." and cmt_id>".$current_id);
 	
 	$values=$_SGLOBAL['db']->getDoubleArray($results);
 	for ($index = 0; $index <count($values); $index++) {
 		$option=get_vote_option($values[$index]['f_id']);
    	$values[$index]=array_merge($values[$index],$option);
 	}
 	

 	
 	return $values;
 }
 


  function get_vote_option($vop_id)
 {
 	global $_SGLOBAL;
 	$query=$_SGLOBAL['db']->query("select * from vote_option where vop_id=$vop_id");
 	$val=$_SGLOBAL['db']->fetch_array($query);
 	return $val;
 }


 function get_players()
 {
 	global $_SGLOBAL;
 	$query=$_SGLOBAL['db']->query("select * from vote_option order by vop_id");
    $values=$_SGLOBAL['db']->getDoubleArray($query);
    return $values;
 }
 
 function get_all_message()
 {
 	 	global $_SGLOBAL;
 	$query=$_SGLOBAL['db']->query("select * from comment where f_type=".COMMENT_MESSAGE_TYPE." order by cmt_id desc");
    $values=$_SGLOBAL['db']->getDoubleArray($query);
    return $values;
 }
 
 function get_ranked_players()
 {
 		global $_SGLOBAL;
 	$query=$_SGLOBAL['db']->query("select * from vote_option order by up_count DESC");
    $values=$_SGLOBAL['db']->getDoubleArray($query);
    return $values;
 }
 

  
  

  

  function getCommentsOfVoteOption($current=0)
  {
  	global $_SGLOBAL;
 	$results=$_SGLOBAL['db']->query("select * from comment where f_type=".COMMENT_VOTE_TYPE." and f_id=$current order by cmt_id desc" );
  	  	$values=$_SGLOBAL['db']->getDoubleArray($results);
     return $values;
  }
  
  function get_recent_messages()
  {
  	 	global $_SGLOBAL;
 	$results=$_SGLOBAL['db']->query("select * from comment where f_type=".COMMENT_MESSAGE_TYPE." order by cmt_id desc limit 6"  );
  	  	$values=$_SGLOBAL['db']->getDoubleArray($results);
     return $values;
  }
  


  
?>