<?php
require './common.php';
$id=intval($_GET['voteid']);
if ($id==0)
die();
$v=get_vote_option($id);
$cvalues=getCommentsOfVoteOption($id);
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
            
              <div id="player">
               <div class="title">
               <?php echo $v['title']?>
               </div>
               <p style="font-size:1.3em;padding-right:60px;margin-top:30px;" class="description"><?php echo $v['note']?></p>
               <br/><br/>
               <a href="contact.php?id=<?php echo $v['vop_id']?>" class="contact_ta"></a>
               <br/>
               <br/>
               <img width="500px" src="<?php echo $_SC['siteurl'].$v['pic_path']?>"></img>
				
              <br/><br/>
              <div id="message">
              <div class="title" style="color:blue">支持的话语</div><br></br>
              <?php foreach($cvalues as $v2){ ?>
         <div class="message_block" style='margin-top:8px;'>
             <img src="images/msg.gif"></img> <span style="font-size:16px;border-bottom:1px dashed #92cbed"><?php echo "$v2[name]对$v[title]说：     $v2[content] "?></span>

              </div>
              <?php }?>
             
            </div>
            </div>
            </div>
 
       <div id="bottom">
            </div>
			<div id="mask"></div>
            <?php require 'footer.php'?>
        </div>
                  
        <!-- footer ends-->
    </body>
</html>

                          