<?php
require_once("server.php");
$event=$_GET['event'];

switch($event){
    case "insert":
        $manv=$_GET['manv'];
        $tennv=$_GET['tennv'];
        $gtnv=$_GET['gtnv'];
        $nsnv=$_GET['nsnv'];
        $sdtnv=$_GET['sdtnv'];
        $quequannv=$_GET['quequannv'];
        $thuongtrunv=$_GET['thuongtrunv'];
        $emailnv=$_GET['emailnv'];
        $manvql=$_GET['manvql'];

        $sql="INSERT INTO `nhan_vien` (manv,tennv,gtnv,nsnv,sdtnv,quequannv,thuongtrunv,emailnv,manvql)
        VALUES('".$manv."','".$tennv."','".$gtnv."','".$nsnv."','".$sdtnv."','".$quequannv."','".$thuongtrunv."','".$emailnv."','".$manvql."')";
        if (mysqli_query($conn, $sql)){
            $res[$event] = 1;
        }else{
            $res[$event] = 0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "delete":

        $manv=$_GET['manv'];
        $sql="DELETE FROM `nhan_vien` WHERE manv='".$manv."'";
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
        $manv=$_GET['manv'];
        $tennv=$_GET['tennv'];
        $gtnv=$_GET['gtnv'];
        $nsnv=$_GET['nsnv'];
        $sdtnv=$_GET['sdtnv'];
        $quequannv=$_GET['quequannv'];
        $thuongtrunv=$_GET['thuongtrunv'];
        $emailnv=$_GET['emailnv'];
        $manvql=$_GET['manvql'];
            $sql="UPDATE  `nhan_vien` 
            SET tennv='".$tennv.
            "',gtnv='".$gtnv.
            "',nsnv='".$nsnv.
            "',sdtnv='".$sdtnv.
            "',quequannv='".$quequannv.
            "',thuongtrunv='".$thuongtrunv.
            "',emailnv='".$emailnv.
            "',manvql='".$manvql."'
            WHERE manv='".$manv."'";
        
                if (mysqli_query($conn, $sql)) {
                    $res[$event] = 1;
                } else {
                    $res[$event] = 0;
                }
            
            echo json_encode($res);
            mysqli_close($conn);
            break;
    case "getDSNhanVien":
         $mang=array();
         $record=$_GET['record'];
         $page=$_GET['page'];
         $vt=$page*$record;
         $limit='limit '.$vt.' , '.$record;
         $sql=mysqli_query($conn,"select manv, tennv, gtnv, nsnv, sdtnv, quequannv, thuongtrunv, emailnv, manvql from nhan_vien ".$limit);
         while($rows=mysqli_fetch_array($sql)){
             $id=$rows['manv'];
             $usertemp['manv']=$rows['manv'];
             $usertemp['tennv']=$rows['tennv'];
             $usertemp['gtnv']=$rows['gtnv'];
             $usertemp['nsnv']=$rows['nsnv'];
             $usertemp['sdtnv']=$rows['sdtnv'];
             $usertemp['quequannv']=$rows['quequannv'];
             $usertemp['thuongtrunv']=$rows['thuongtrunv'];
             $usertemp['emailnv']=$rows['emailnv'];
             $usertemp['manvql']=$rows['manvql'];
             $mang[$id]=$usertemp;
         }
         $rs=mysqli_query($conn,"select COUNT(*) as 'total' from nhan_vien");
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