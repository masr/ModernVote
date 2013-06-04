<?php
require './common.php';
$id=intval($_GET['id']);
if ($id==0)
die();
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
   <?php require './header.php';?>
        
        <style>
       #player {padding:20px 0 20px 80px}
	    .title{font-size:25px;}
	    
        </style>
    </head>
    <body>
    <div id="content">
       <?php require './guide.php';?>
       <div id="main"></div>
            <div id="back">
            
         <form action="do_contact.php" method="post">
         <label>您的姓名：</label>
         <input type="text" name="name"></input>
         <br/>
         <label>您的手机：</label>
          <input type="text" name="phone"></input>
          <br/>
          <input type="submit" value="提交"></input>
          <input type="hidden" name="id" value="<?php echo $id?>"></input>
         </form>
            </div>
 
       <div id="bottom">
            </div>
			<div id="mask"></div>
            <?php require 'footer.php'?>
        </div>
                  
        <!-- footer ends-->
    </body>
</html>

                          