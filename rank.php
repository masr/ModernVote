<?php
include_once './common.php';
header("Content-Type:text/plain;charset=utf-8");

$values=get_ranked_players();
$str="{";
$i=0;
$r=$i;
$pre=-1;
foreach($values as $v)
{
	$i++;
	if($v[up_count]!=$pre){
		$r=$i;
		$pre=$v[up_count];
	}
	$str.="$v[vop_id]:{rank:$r,up_count:$v[up_count],remark_count:$v[remark_count]},";
}

$len=strlen($str);
$str=substr($str,0,$len-1);
$str.="}";
echo $str;

?>