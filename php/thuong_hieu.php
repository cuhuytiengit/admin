<?php
require_once("server.php");
$event=$_GET['event'];

switch($event){
    case "insert":
        $math=$_GET['math'];
        $tenth=$_GET['tenth'];
        $sdtth=$_GET['sdtth'];
        $diachith=$_GET['diachith'];
        $emailth=$_GET['emailth'];

        $sql="INSERT INTO `thuong_hieu` (math,tenth,sdtth,diachith,emailth)
        VALUES('".$math."','".$tenth."','".$sdtth."','".$diachith."','".$emailth."')";
        if (mysqli_query($conn, $sql)){
            $res[$event] = 1;
        }else{
            $res[$event] = 0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "delete":
        $math=$_GET['math'];
        $sql="DELETE FROM `thuong_hieu`
        WHERE math='".$math."'";
        mysqli_query($conn,$sql);
        if (mysqli_affected_rows($conn)>0){
            $res[$event]=1;
        } else{
            $res[$event]=0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "update":
        $math=$_GET['math'];
        $tenth=$_GET['tenth'];
        $sdtth=$_GET['sdtth'];
        $diachith=$_GET['diachith'];
        $emailth=$_GET['emailth'];
            $sql="UPDATE  `thuong_hieu`
            SET tenth='".$tenth.
            "',sdtth='".$sdtth.
            "',diachith='".$diachith.
            "',emailth='".$emailth."' 
            WHERE math='".$math."'";
        
                if (mysqli_query($conn, $sql)) {
                    $res[$event] = 1;
                } else {
                    $res[$event] = 0;
                }
            
            echo json_encode($res);
            mysqli_close($conn);
            break;

    case "getDSThuongHieu":
         $mang=array();
         $record=$_GET['record'];
         $page=$_GET['page'];
         $vt=$page*$record;
         $limit='limit '.$vt.' , '.$record;
         $sql=mysqli_query($conn,"select math, tenth, sdtth, diachith, emailth from thuong_hieu ".$limit);
         while($rows=mysqli_fetch_array($sql)){
             $id=$rows['math'];
             $usertemp['math']=$rows['math'];
             $usertemp['tenth']=$rows['tenth'];
             $usertemp['sdtth']=$rows['sdtth'];
             $usertemp['diachith']=$rows['diachith'];
             $usertemp['emailth']=$rows['emailth'];
             $mang[$id]=$usertemp;
         }
         $rs=mysqli_query($conn,"select COUNT(*) as 'total' from thuong_hieu");
         $row=mysqli_fetch_array($rs);
         $jsonData['total'] = (int)$row['total'];
         $jsonData['totalpage'] = ceil($row['total']/$record);
         $jsonData['page']=(int)$page;
         $jsonData['items'] = $mang;

         echo json_encode($jsonData);
         mysqli_close($conn);
        break;
        default:
        #code...
        break;
}
?>