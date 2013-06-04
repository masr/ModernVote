<?php
require './common.php';
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
   <?php require 'header.php';?>
        


    </head>
    <body>
    <div id="content">
       <?php require 'guide.php';?>
       <div id="main"></div>
            <div id="back">
            <?php $messages=get_all_message();?>
          
             <ul id='msg' class='msgList'>
                        <?php 
                        foreach($messages as $v)
                        {
                        ?>
                            <li class='msgItem'>
                                <div class='msgInfo'>
                                   <?php echo $v['content'] ?>
                                </div>
                                <div class='msgTag'>
                                    <div class='msgAuthor'>
                                        <span><?php echo get_datetime($v['created_at'])?></span>
                                    </div>
                                </div>
                            </li>
                            <?php }?>
                           
                        </ul>
                <div style="clear: both;">
                    &nbsp;
                </div>
                <!--content ends --><!--footer begins -->
            </div>
            <div id="bottom">
            </div>
<?php require 'footer.php'?>

			<div id="mask"></div>
          
        </div>
        <!-- footer ends-->
    </body>
</html>

                          