<?php require 'common.php';
   for($i=1;$i<=20;$i++)
{
  $_SGLOBAL['db']->query("select * from vote_log where voteid=$i and status=1");
  $n=$_SGLOBAL['db']->affected_rows();
  $_SGLOBAL['db']->query("update vote_option set up_count=$n where vop_id=$i");

}
?>

