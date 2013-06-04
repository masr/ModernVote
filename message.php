<?php
include_once("./common.php");
header("Content-Type:text/plain;charset=utf-8");

if (!empty($_POST)){
$content=$_POST['content'];
$cookie=$_COOKIE['user'];
$created_at=get_time();
$_SGLOBAL['db']->query("insert into comment (f_type,content,cookie,created_at) values(".COMMENT_MESSAGE_TYPE.",'$content','$cookie',$created_at)");
}
$mvalues=get_recent_messages();
foreach($mvalues as $v)
{
echo "<li class='msgItem'>
<div class='msgInfo'>";
echo $v['content'];
echo "</div>
<div class='msgTag'>
<div class='msgAuthor'><span>";
echo get_datetime($v['created_at']);
echo "</span>
</div>
</div>
</li>";
}

?>
