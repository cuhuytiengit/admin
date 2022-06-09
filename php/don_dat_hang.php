<?php
require_once("server.php");
$event=$_GET['event'];

switch($event){
    case "insert":
        $maddh=$_GET['maddh'];
        $ngayddh=$_GET['ngayddh'];
        $trangthaiddh=$_GET['trangthaiddh'];
        $ngkg=$_GET['ngkg'];
        $nttg=$_GET['nttg'];
        $makh=$_GET['makh'];
        $manv=$_GET['manv'];

        $sql="INSERT INTO `don_dat_hang` 
        (madh,ngaydh,trangthaidh,ngaydukiengiao,ngaythuctegiao,makh,manv)
        VALUES('".$maddh."','"
        .$ngayddh."','"
        .$trangthaiddh."','"
        .$ngkg."','"
        .$nttg."','"
        .$makh."','"
        .$manv."')";
        if (mysqli_query($conn, $sql)){
            $res[$event] = 1;
        }else{
            $res[$event] = 0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "delete":
        $maddh=$_GET['maddh'];
        $sql="DELETE FROM `don_dat_hang` WHERE madh='".$maddh."'";
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
        $maddh=$_GET['maddh'];
        $ngayddh=$_GET['ngayddh'];
        $trangthaiddh=$_GET['trangthaiddh'];
        $ngkg=$_GET['ngkg'];
        $nttg=$_GET['nttg'];
        $makh=$_GET['makh'];
        $manv=$_GET['manv'];
            $sql="UPDATE  `don_dat_hang` 
            SET ngaydh='".$ngayddh.
            "',trangthaidh='".$trangthaiddh.
            "',ngaydukiengiao='".$ngkg.
            "',ngaythuctegiao='".$nttg.
            "',makh='".$makh.
            "',manv='".$manv."' 
            WHERE madh='".$maddh."'";
        
                if (mysqli_query($conn, $sql)) {
                    $res[$event] = 1;
                } else {
                    $res[$event] = 0;
                }
            
            echo json_encode($res);
            mysqli_close($conn);
            break;

    case "getDSDonDatHang":
        $mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
        $vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select madh, ngaydh, trangthaidh, ngaydukiengiao, ngaythuctegiao, makh, manv from don_dat_hang ".$limit);
        while($rows=mysqli_fetch_array($sql)){
            $id=$rows['madh'];
            $usertemp['maddh']=$rows['madh'];
            $usertemp['ngayddh']=$rows['ngaydh'];
            $usertemp['trangthaiddh']=$rows['trangthaidh'];
            $usertemp['ndkg']=$rows['ngaydukiengiao'];
            $usertemp['nttg']=$rows['ngaythuctegiao'];
            $usertemp['makh']=$rows['makh'];
            $usertemp['manv']=$rows['manv'];
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from don_dat_hang");
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