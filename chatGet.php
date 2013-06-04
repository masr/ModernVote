<?php
include_once 'config.php';
	date_default_timezone_set("Asia/Hong_Kong");

function getLast(){
	global $_SC;
	$db=mysql_connect($_SC['dbhost'],$_SC['dbuser'],$_SC['dbpw']) or die('mysql connect failure!');
	mysql_select_db($_SC['dbname']);
	mysql_query('set names utf8');
	$result=mysql_query('SELECT time FROM chat ORDER BY time DESC LIMIT 1');
	$line=0;
	if($result)
	$line=mysql_result($result,0,0);
	mysql_close($db);
	return $line;
}


$time=$_REQUEST['time'];
if(empty($time)){
	$time=0;
}



$try_num=0;
$rtn=array();
$num=getLast();
//echo $num;
while($num<=$time){
	$try_num++;
	if($try_num>=70){
		break;
	}
	usleep(200000);
	$num=getLast();
}
if($num>$time){
	$db=mysql_connect($_SC['dbhost'],$_SC['dbuser'],$_SC['dbpw']) or die('mysql connect failure!');
	mysql_select_db($_SC['dbname']);
	mysql_query('set names utf8');
	$query='SELECT * FROM chat WHERE time>'.$time.' ORDER BY time DESC LIMIT 10';
	$result=mysql_query($query);
	while($line=mysql_fetch_array($result)){
		$msg=array('id'=>$line[0],'username'=>$line[1],'message'=>htmlspecialchars_decode($line[2]),'time'=>$line[3],'vtime'=>date('n-j G:i:s',$line[3]));
		$rtn[]=$msg;
	}
	mysql_close($db);
}

echo json_encode($rtn);

?>