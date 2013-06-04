<?php
include_once("./common.php");
header("Content-Type:text/plain;charset=utf-8");

if (!empty($_POST)){
$name=$_POST['name'];
$phone=$_POST['phone'];
$vop_id=$_POST['id'];
$created_at=get_time();
$_SGLOBAL['db']->query("insert into contact (vop_id,phone,date,name) values('$vop_id','$phone',$created_at,'$name')");
}
header('location:/player_show.php?voteid='.$vop_id);

?>
