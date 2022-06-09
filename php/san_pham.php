<?php
require_once("server.php");
$event=$_GET['event'];

switch($event){
    case "insert":
        $masp=$_GET['masp'];
        $tensp=$_GET['tensp'];
        $ngaysx=$_GET['ngaysx'];
        $slt=$_GET['slt'];
        $imgnuoc=$_GET['imgnuoc'];
        $giagoc=$_GET['giagoc'];
        $giaban=$_GET['giaban'];
        $giamgia=(1-$giaban/$giagoc)*100;

        $sql="INSERT INTO `san_pham` (masp,tensp,ngaysx,slton,imgnuocuong,giagoc,giamgia,giaban) 
        VALUES('".$masp."','".$tensp."','".$ngaysx."','".$slt."','".$imgnuoc."','".$giagoc."','".$giamgia."','".$giaban."')";
        if (mysqli_query($conn, $sql)){
            $res[$event] = 1;
        }else{
            $res[$event] = 0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;
    
    case "delete":

        $masp=$_GET['masp'];

        $sql="DELETE FROM `san_pham` WHERE masp='".$masp."'";
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
        $masp=$_GET['masp'];
        $tensp=$_GET['tensp'];
        $ngaysx=$_GET['ngaysx'];
        $slt=$_GET['slt'];
        $imgnuoc=$_GET['imgnuoc'];
        $giagoc=$_GET['giagoc'];
        $giaban=$_GET['giaban'];
        $giamgia=(1-$giaban/$giagoc)*100;
            $sql="UPDATE  `san_pham` SET tensp='".$tensp.
            "', ngaysx='".$ngaysx.
            "',slton='".$slt.
            "',imgnuocuong='".$imgnuoc.
            "',giagoc='".$giagoc.
            "',giamgia='".$giamgia.
            "',giaban='".$giaban."'
            WHERE masp='".$masp."'";
        
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
            
            echo json_encode($res);
            mysqli_close($conn);
            break;
    case "getDSSanPham":
    
        $mang=array();
        $record=$_GET['record'];
        $page=$_GET['page'];
        $vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"SELECT masp,tensp,ngaysx,slton,imgnuocuong,giagoc,giamgia,giaban from san_pham ".$limit); 
        while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['masp'];
            $usertemp['masp']=$rows['masp'];
            $usertemp['tensp']=$rows['tensp'];
            $usertemp['ngaysx']=$rows['ngaysx'];
            $usertemp['slt']=$rows['slton'];
            $usertemp['imgnuoc']=$rows['imgnuocuong'];
            $usertemp['giagoc']=$rows['giagoc'];
            $usertemp['giamgia']=$rows['giamgia'];
            $usertemp['giaban']=$rows['giaban'];
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from san_pham");
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
        $jsonData['totalpage'] =ceil($row['total']/$record);
        $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        
        echo json_encode($jsonData);
        mysqli_close($conn);
            break;

        case "getDSTimkiem":

            $mang=array();
            $masp=$_GET['masp'];
            $tensp=$_GET['tensp'];
            $record=$_GET['record'];
            $page=$_GET['page'];
            $vt=$page*$record;
            $limit='limit '.$vt.' , '.$record;
            $sql=mysqli_query($conn,"SELECT masp,tensp,ngaysx,slton,imgnuocuong,giagoc,giamgia,giaban from san_pham where masp like '%".$masp."%' or tensp like '%".$tensp."%'".$limit); 
            while($rows=mysqli_fetch_array($sql))
            {
                $id=$rows['masp'];
                $usertemp['masp']=$rows['masp'];
                $usertemp['tensp']=$rows['tensp'];
                $usertemp['ngaysx']=$rows['ngaysx'];
                $usertemp['slt']=$rows['slton'];
                $usertemp['imgnuoc']=$rows['imgnuocuong'];
                $usertemp['giagoc']=$rows['giagoc'];
                $usertemp['giamgia']=$rows['giamgia'];
                $usertemp['giaban']=$rows['giaban'];
                $mang[$id]=$usertemp;
            }
            $rs=mysqli_query($conn,"select COUNT(*) as 'total' from san_pham");
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