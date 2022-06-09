<?php
require_once("server.php");
$event=$_GET['event'];

switch($event){
    case "insert":
        $makh=$_GET['makh'];
        $tenkh=$_GET['tenkh'];
        $sdtkh=$_GET['sdtkh'];
        $diachikh=$_GET['diachikh'];
        $emailkh=$_GET['emailkh'];

        $sql="INSERT INTO `khach_hang` (makh,tenkh,sdtkh,diachikh,emailkh)
        VALUES('".$makh."','".$tenkh."','".$sdtkh."','".$diachikh."','".$emailkh."')";
        if (mysqli_query($conn, $sql)){
            $res[$event] = 1;
        }else{
            $res[$event] = 0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "delete":

        $makh=$_GET['makh'];
        $sql="DELETE FROM `khach_hang` WHERE makh='".$makh."'";
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
        $makh=$_GET['makh'];
        $tenkh=$_GET['tenkh'];
        $sdtkh=$_GET['sdtkh'];
        $diachikh=$_GET['diachikh'];
        $emailkh=$_GET['emailkh'];
            $sql="UPDATE  `khach_hang` 
            SET tenkh='".$tenkh.
            "',sdtkh='".$sdtkh.
            "',diachikh='".$diachikh.
            "',emailkh='".$emailkh."' 
            WHERE makh='".$makh."'";
        
                if (mysqli_query($conn, $sql)) {
                    $res[$event] = 1;
                } else {
                    $res[$event] = 0;
                }
            
            echo json_encode($res);
            mysqli_close($conn);
            break;

    case "getDSKhachHang":
         $mang=array();
         $record=$_GET['record'];
         $page=$_GET['page'];
         $vt=$page*$record;
         $limit='limit '.$vt.' , '.$record;
         $sql=mysqli_query($conn,"select makh, tenkh, sdtkh, diachikh, emailkh from khach_hang ".$limit);
         while($rows=mysqli_fetch_array($sql)){
             $id=$rows['makh'];
             $usertemp['makh']=$rows['makh'];
             $usertemp['tenkh']=$rows['tenkh'];
             $usertemp['sdtkh']=$rows['sdtkh'];
             $usertemp['diachikh']=$rows['diachikh'];
             $usertemp['emailkh']=$rows['emailkh'];
             $mang[$id]=$usertemp;
         }
         $rs=mysqli_query($conn,"select COUNT(*) as 'total' from khach_hang");
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