<?php
require './common.php';$curM=3;
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php require 'header.php';?>
<script type="text/javascript" src="js/jquery-1.4.2.js"></script>
<script type="text/javascript" src='js/chat.js'></script>
<link href="css/chat.css" rel="stylesheet" type="text/css"
	media="screen" />

</head>
<body>
<div id="content"><?php require 'guide.php';?>
<div id="main"></div>
<div id="back" style="text-align: center">
<div id='chatBoard'></div>
<div class='inputAren'>
<div class='uinfo'><span>请输入你的昵称：</span> <input id='uname' type='text' <?php 
            			$name='在此处输入你的昵称';
            			$name=$_COOKIE['username'];
            			if(empty($name)){
            				$name='在此处输入你的昵称';
            			}
            			echo 'value=\''.$name.'\''; 		?> /> 
</div>
<textarea cols="80" id="editor1" name="editor1" rows="10"></textarea> 
<br/>
            		<input type='button' value='发送' onclick='sendMsg();'/> 
            		<!--  <input type='button' value='Get' onclick='getTest();'></input>-->
            		</div>
            		<div style="clear: both;">&nbsp;</div>
</div>

<div id="bottom"></div>
<!--content ends --><!--footer begins --></div>

<div id="footer">
<p>Copyright &copy; 2010. Designed by <a href="http://yuhanghome.net"
	title="Abraham">Abraham</a>&<a href=''>Eric</a></p>
</div>
<div id="mask"></div>

</div>
<!-- footer ends-->
</body>
</html>

