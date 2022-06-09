<?php
require_once("server.php");
$event=$_GET['event'];

switch($event){
    case "insert":
        $mancc=$_GET['mancc'];
        $tenncc=$_GET['tenncc'];
        $sdtncc=$_GET['sdtncc'];
        $diachincc=$_GET['diachincc'];
        $emailncc=$_GET['emailncc'];

        $sql="INSERT INTO `nha_cung_cap` (mancc,tenncc,sdtncc,diachincc,emailncc)
        VALUES('".$mancc."','".$tenncc."','".$sdtncc."','".$diachincc."','".$emailncc."')";
        if (mysqli_query($conn, $sql)){
            $res[$event] = 1;
        }else{
            $res[$event] = 0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "delete":
        $mancc=$_GET['mancc'];
        $sql="DELETE FROM `nha_cung_cap` WHERE mancc='".$mancc."'";
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
        $mancc=$_GET['mancc'];
        $tenncc=$_GET['tenncc'];
        $sdtncc=$_GET['sdtncc'];
        $diachincc=$_GET['diachincc'];
        $emailncc=$_GET['emailncc'];
            $sql="UPDATE  `nha_cung_cap` 
            SET tenncc='".$tenncc.
            "',sdtncc='".$sdtncc.
            "',diachincc='".$diachincc.
            "',emailncc='".$emailncc."' 
            WHERE mancc='".$mancc."'";
        
                if (mysqli_query($conn, $sql)) {
                    $res[$event] = 1;
                } else {
                    $res[$event] = 0;
                }
            
            echo json_encode($res);
            mysqli_close($conn);
            break;

    case "getDSNhaCungCap":
         $mang=array();
         $record=$_GET['record'];
         $page=$_GET['page'];
         $vt=$page*$record;
         $limit='limit '.$vt.' , '.$record;
         $sql=mysqli_query($conn,"select mancc, tenncc, sdtncc, diachincc, emailncc from nha_cung_cap ".$limit);
         while($rows=mysqli_fetch_array($sql)){
             $id=$rows['mancc'];
             $usertemp['mancc']=$rows['mancc'];
             $usertemp['tenncc']=$rows['tenncc'];
             $usertemp['sdtncc']=$rows['sdtncc'];
             $usertemp['diachincc']=$rows['diachincc'];
             $usertemp['emailncc']=$rows['emailncc'];
             $mang[$id]=$usertemp;
         }
         $rs=mysqli_query($conn,"select COUNT(*) as 'total' from nha_cung_cap");
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