<?php
require_once("server.php");
$event=$_GET['event'];

switch($event){
    case "insert":
        $matl_tlsp=$_GET['matl_tlsp'];
        $masp_tlsp=$_GET['masp_tlsp'];

        $sql="INSERT INTO `lktg_tl_sp` (matl,masp) VALUES('".$matl_tlsp."','".$masp_tlsp."')";
        if (mysqli_query($conn, $sql)){
            $res[$event] = 1;
        }else{
            $res[$event] = 0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;
    
    case "delete":

        $matl_tlsp=$_GET['matl_tlsp'];

        $sql="DELETE FROM `lktg_tl_sp` WHERE matl='".$matl_tlsp."'";
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
        $matl_tlsp=$_GET['matl_tlsp'];
        $masp_tlsp=$_GET['masp_tlsp'];
            $sql="UPDATE  `lktg_tl_sp` SET masp='".$masp_tlsp."' 
            WHERE matl='".$matl_tlsp."'";
        
                if (mysqli_query($conn, $sql)) {
                    $res[$event] = 1;
                } else {
                    $res[$event] = 0;
                }
            
            echo json_encode($res);
            mysqli_close($conn);
            break;
    case "getDStlsp":
    
        $mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
        $vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select matl,masp from lktg_tl_sp ".$limit); 
        while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['matl'];
            $usertemp['matl_tlsp']=$rows['matl'];
            $usertemp['masp_tlsp']=$rows['masp'];
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from lktg_tl_sp");
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