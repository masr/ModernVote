<?php
include_once './common.php';


$values=get_ranked_players();


$str="var players={";
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
	$str.="$v[vop_id]:{rank:$r,id:'$v[vop_id]',name:'$v[title]',link:'$_SC[siteurl]/player_show.php?voteid=$v[vop_id]',large_figure:'$_SC[siteurl]$v[pic_path]',little_figure:'$_SC[siteurl]$v[little_pic_path]',mid_figure:'$_SC[siteurl]$v[mid_pic_path]',up_count:$v[up_count],remark_count:$v[remark_count]},";
}

$len=strlen($str);
$str=substr($str,0,$len-1);
$str.="}";
echo $str;

header("Content-Type:text/javascript;charset=utf-8");


?>