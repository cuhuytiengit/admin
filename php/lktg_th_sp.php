<?php
require_once("server.php");
$event=$_GET['event'];

switch($event){
    case "insert":
        $math_thsp=$_GET['math_thsp'];
        $masp_thsp=$_GET['masp_thsp'];

        $sql="INSERT INTO `lktg_th_sp` (math,masp) VALUES('".$math_thsp."','".$masp_thsp."')";
        if (mysqli_query($conn, $sql)){
            $res[$event] = 1;
        }else{
            $res[$event] = 0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;
    
    case "delete":

        $math_thsp=$_GET['math_thsp'];

        $sql="DELETE FROM `lktg_th_sp` WHERE math='".$math_thsp."'";
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
        $math_thsp=$_GET['math_thsp'];
        $masp_thsp=$_GET['masp_thsp'];
            $sql="UPDATE  `lktg_th_sp` SET masp='".$masp_thsp."' 
            WHERE math='".$math_thsp."'";
        
                if (mysqli_query($conn, $sql)) {
                    $res[$event] = 1;
                } else {
                    $res[$event] = 0;
                }
            
            echo json_encode($res);
            mysqli_close($conn);
            break;
    case "getDSthsp":
    
        $mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
        $vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select math,masp from lktg_th_sp ".$limit); 
        while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['math'];
            $usertemp['math_thsp']=$rows['math'];
            $usertemp['masp_thsp']=$rows['masp'];
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from lktg_th_sp");
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
        $jsonData['totalpage'] =ceil($row['total']/$record);
        $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
            break;
        default:
        # code...
        break;
}
?>