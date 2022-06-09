<?php
require_once("server.php");
$event=$_GET['event'];

switch($event){
    case "insert":
        $matl=$_GET['matl'];
        $tentl=$_GET['tentl'];

        $sql="INSERT INTO `the_loai` (matl,tentl) VALUES('".$matl."','".$tentl."')";
        if (mysqli_query($conn, $sql)){
            $res[$event] = 1;
        }else{
            $res[$event] = 0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;
    
    case "delete":

        $matl=$_GET['matl'];

        $sql="DELETE FROM `the_loai` WHERE matl='".$matl."'";
        mysqli_query($conn, $sql);
        if (mysqli_affected_rows($conn)>0){
            $res[$event]=1;
        }else{
            $res[$event]=0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "update":
        $matl=$_GET['matl'];
        $tentl=$_GET['tentl'];
            $sql="UPDATE  `the_loai` SET tentl='".$tentl."' 
            WHERE matl='".$matl."'";
        
                if (mysqli_query($conn, $sql)) {
                    $res[$event] = 1;
                } else {
                    $res[$event] = 0;
                }
            
            echo json_encode($res);
            mysqli_close($conn);
            break;
    case "getDSTheLoai":
    
        $mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
        $vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"SELECT matl,tentl from the_loai ".$limit); 
        while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['matl'];
            $usertemp['matl']=$rows['matl'];
            $usertemp['tentl']=$rows['tentl'];
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"SELECT COUNT(*) as 'total' from the_loai");
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
        $jsonData['totalpage'] =ceil($row['total']/$record);
        $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
            break;
    case "UpdateAvatar":
        $avartar=$_GET['avartar'];
        $username=$_GET['username']; 
            $sql="update users set avartar='".$avartar."' where username='".$username."'";
            
            
                if (mysqli_query($conn, $sql)) {
                    $res[$event] = 1;
                } else {
                    $res[$event] = 0;
                }
            
            echo json_encode($res);
            mysqli_close($conn);
            break;
    default:
    #code...
    break;
}
?>