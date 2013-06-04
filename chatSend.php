<?php
	include_once 'config.php';
	date_default_timezone_set("Asia/Hong_Kong");
	
	$username=trim($_REQUEST['username']);
	if(empty($username)){
		echo '0,need username';
		exit();
	}
	
	$message=$_REQUEST['message'];
	if(empty($message)){
		echo '0,message is empty!';
		exit();
	}

	$time=time();//$arr['hours'].':'.$arr['minutes'].':'.$arr['seconds'];
	//echo $time;
	//exit();
	$db=mysql_connect($_SC['dbhost'],$_SC['dbuser'],$_SC['dbpw']) or die('mysql connect failure!');
	mysql_select_db($_SC['dbname']);
	mysql_query('set names utf8');

	$query='INSERT INTO chat (username,message,time) VALUES("'.$username.'","'.htmlspecialchars($message).'","'.$time.'")';
	//echo $query;
	$result=mysql_query($query);
	//$result=mysql_query('SELECT * FROM chat LIMIT 1');
	//$result=mysql_query('SELECT LAST_INSERT_ID()');
	//$line=mysql_result($result,0,0);
	//$rtn=array('id'=>$line,'username'=>$username,'message'=>htmlentities($message),'time'=>$time);

	//echo json_encode($rtn);
	mysql_close($db);
	echo $result;
?>