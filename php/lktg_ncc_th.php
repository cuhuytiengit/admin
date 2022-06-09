<?php
require_once("server.php");
$event=$_GET['event'];

switch($event){
    case "insert":
        $mancc_nccth=$_GET['mancc_nccth'];
        $math_nccth=$_GET['math_nccth'];

        $sql="INSERT INTO `lktg_ncc_th` (mancc,math) VALUES('".$mancc_nccth."','".$math_nccth."')";
        if (mysqli_query($conn, $sql)){
            $res[$event] = 1;
        }else{
            $res[$event] = 0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;
    
    case "delete":

        $mancc_nccth=$_GET['mancc_nccth'];

        $sql="DELETE FROM `lktg_ncc_th` WHERE mancc='".$mancc_nccth."'";
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
        $mancc_nccth=$_GET['mancc_nccth'];
        $math_nccth=$_GET['math_nccth'];
            $sql="UPDATE  `lktg_ncc_th` SET math='".$math_nccth."' 
            WHERE mancc='".$mancc_nccth."'";
        
                if (mysqli_query($conn, $sql)) {
                    $res[$event] = 1;
                } else {
                    $res[$event] = 0;
                }
            
            echo json_encode($res);
            mysqli_close($conn);
            break;
    case "getDSnccth":
    
        $mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
        $vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select mancc,math from lktg_ncc_th ".$limit); 
        while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['mancc'];
            $usertemp['mancc_nccth']=$rows['mancc'];
            $usertemp['math_nccth']=$rows['math'];
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from lktg_ncc_th");
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