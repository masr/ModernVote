<?php

 include_once("./common.php");
 header("Content-Type:text/plain;charset=utf-8");


 
 $values=array();

  $current_id=intval($_POST['curid']);

  if (empty($current_id))
    {
    	echo "{}" ;
    	exit();
    }
       
  

     

 	if (has_new_feed($current_id))
 	{
 		$values=get_feeds($current_id);
 		$str="[";
 		foreach ($values as $v)
 		{
 			$created_at=get_datetime($v['created_at']);
 			
 			$str.="{id:$v[f_id],feed_id:$v[cmt_id],to:'$v[title]',from:'$v[name]',figure:'$v[little_pic_path]',link:'',created_at:'$created_at',say:'$v[content]',up_count:$v[up_count],remark_count:$v[remark_count]},";
 		}
 		$len=strlen($str);
         $str=substr($str,0,$len-1);
           $str.="]";
             echo $str;
 	}
 		else 
 		{
 			echo "{}";
 			exit();
 		}
 	

 		






 
 
?>