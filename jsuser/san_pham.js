//(sản phẩm Lavie)click thêm - lưu - làm lại
$(".btn_themsanpham").click(function(){
    var masp=$(".txtmasp").val();//lấy giá trị từ ô nhập liệu
    var tensp=$(".txttensp").val();
    var ngaysx=$(".txtngaysxsp").val();
    var slt=$(".txtslt").val();
    var imgnuoc=$(".txtimgnuoc").val();
    var giagoc=$(".txtgiagoc").val();
    var giaban=$(".txtgiaban").val();
    if(masp==""){
        alert_info("Mã sản phẩm khác khoảng trống!");}
    else if(tensp==""){
        alert_info("Tên sản phẩm khác khoảng trống!");}
    else if(ngaysx==""){
        alert_info("Ngày sản xuất không được để trống!");}
    else if(slt==""||isNumber(slt)==false){
        alert_info("Số lượng tồn phải là số và không được để trống!");}
    else if(imgnuoc==""){
        alert_info("url ảnh không hợp lệ!");}
    else if(giagoc==""||isNumber(giagoc)==false){
        alert_info("Giá gốc không được để trống!");}
    else if(giaban==""||isNumber(giaban)==false){
        alert_info("Giá bán không được để trống!");}
    else{
        var datasend={
            event:"insert",
            masp:masp,
            tensp:tensp,
            ngaysx:ngaysx,
            slt:slt,
            imgnuoc:imgnuoc,
            giagoc:giagoc,
            giaban:giaban
        }
        queryDataGET_JSON("php/san_pham.php", datasend, function(res){
            console.log(res);
            if(res["insert"]==1){
                alert_info("them thanh cong");
            }
            else{
                alert_error("Them khong thanh cong");
            }
        });
    }
});
$(".btn_suasanpham").click(function(){
    var masp=$(".txtmasp").val();//lấy giá trị từ ô nhập liệu
    var tensp=$(".txttensp").val();
    var ngaysx=$(".txtngaysxsp").val();
    var slt=$(".txtslt").val();
    var imgnuoc=$(".txtimgnuoc").val();
    var giagoc=$(".txtgiagoc").val();
    var giaban=$(".txtgiaban").val();
    if(masp==""){
        alert_info("Mã sản phẩm phải khác khoảng trống!");}
    else if(tensp==""){
        alert_info("Tên sản phẩm phải khác khoảng trống!");}
    else if(ngaysx==""){
        alert_info("Ngày sản xuất không được để trống!");}
    else if(slt==""||isNumber(slt)==false){
        alert_info("Số lượng tồn phải là số và không được để trống!");}
    else if(imgnuoc==""){
        alert_info("url ảnh không hợp lệ!");}
    else if(giagoc==""||isNumber(giagoc)==false){
        alert_info("Giá gốc không được để trống!");}
    else if(giaban==""||isNumber(giaban)==false){
        alert_info("Giá bán không được để trống!");}
    else{
        bootbox.confirm("Bạn có chắc sửa sản phẩm có masp: '" + masp + "' ?",
        function(result){
            if(result==true)//Nếu nhấn ok
            {
                var datasend={
                    event:"update",
                    masp:masp,
                    tensp:tensp,
                    ngaysx:ngaysx,
                    slt:slt,
                    imgnuoc:imgnuoc,
                    giagoc:giagoc,
                    giaban:giaban
                }
                queryDataGET_JSON("php/san_pham.php",datasend,function(res){
                    console.log(res);
                    if(res["update"]==1){
                        
                        alert_info("Sửa thành công trang số: " + sanpham_current);
                        builddssanpham(sanpham_current,recordsanpham);
                        $(".txtmasp").val("");
                        $(".txttensp").val("");
                        $(".txtngaysxsp").val("");
                        $(".txtslt").val("");
                        $(".txtimgnuoc").val("");
                        $(".txtgiagoc").val("");
                        $(".txtgiaban").val("");
                    }
                        
                        
                    else{
                        alert_error("Sửa không thành công!");
                    }
            
                });
            }
            else//Nếu nhấn cancel
            {

            }
        });
    }
});
$(".btn_lamlaisanpham").click(function(){
    $(".txtmasp").val("");//THAY giá trị từ ô nhập liệu về mặc định
    $(".txttensp").val("");
    $(".txtngaysxsp").val("");
    $(".txtslt").val("");
    $(".txtimgnuoc").val("");
    $(".txtgiagoc").val("");
    $(".txtgiaban").val("");
});
$(".btn_xoasanpham").click(function(){
    var masp=$(".txtmasp").val();
    if(masp==""){
        alert_info("Mã sản phẩm phải khác khoảng trống!");}
    else{
        bootbox.confirm("Bạn có chắc xóa sản phẩm có masp: '" + masp + "' ?",
        function(result){
            if(result==true)
            {
                var datasend={
                    event:"delete",
                    masp:masp
                }
                queryDataGET_JSON("php/san_pham.php",datasend,function(res){
                    console.log(res);
                    if(res["delete"]==1){
                        alert_info("Xoa thanh cong trang so: " + sanpham_current);
                        builddssanpham(sanpham_current,recordsanpham);
                        $(".txtmasp").val("");
                        $(".txttensp").val("");
                        $(".txtngaysxsp").val("");
                        $(".txtslt").val("");
                        $(".txtimgnuoc").val("");
                        $(".txtgiagoc").val("");
                        $(".txtgiaban").val("");
                    }

                    else{
                        alert_error("Xoa khong thanh cong");}
                });
            }
        });
    } 
});

$(".btn_timkiemsanpham").click(function(){
    var masp=$(".txtmasp").val();
    var tensp=$(".txttensp").val();
    if(tensp==""&&masp==""){
        alert_info("<b style='color:blue;'>Mã sản phẩm</b> hoặc <b style='color:blue;'>Tên sản phẩm</b> phải khác khoảng trống!");}
    else{
        builddstimkiem(masp,tensp,sanpham_current,recordsanpham);
        $(".txtmasp").val("");
        $(".txttensp").val("");
        $(".txtngaysxsp").val("");
        $(".txtslt").val("");
        $(".txtimgnuoc").val("");
        $(".txtgiagoc").val("");
        $(".txtgiaban").val("");
    }
});

//Hiển thị dữ liệu san_pham TÌM KIẾM lấy JSON từ server
function builddssanpham(page,record) {
   
    var dataSend={
		event:"getDSSanPham",
		page:page,
        record:record
    }
    
    $(".listdssanpham").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/san_pham.php",dataSend,function (res) {
            $(".listdssanpham").html("");
            buildHTMLsanphamData(res);
            //alert_info("Đã lấy được dữ liệu " + res);
    });
}
//Hiển thị dữ liệu san_pham lấy JSON từ server
function builddstimkiem(masp,tensp,page,record) {
    
    var dataSend={
		event:"getDSTimkiem",
		page:page,
        record:record,
        masp:masp,
        tensp:tensp
    }
    
    $(".listdssanpham").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/san_pham.php",dataSend,function (res) {
            $(".listdssanpham").html("");
            buildHTMLsanphamData(res);
            //alert_info("Đã lấy được dữ liệu " + res);
    });
}

var resallsanpham;
function buildHTMLsanphamData(res) {
    if(res.total==0){
         $(".listdssanpham").html("Chưa có nội dung");
         
    }else{
     var data = res.items;
    
     resallsanpham=data;
     var stt=1;
    var currentpage=parseInt(res.page);
     stt=printSTT(recordsanpham,currentpage);
     var html='';
     var vt=0;
     for (item in data) {
         var list=data[item];
       
         html=html +
             '<tr data-masp="' + list.masp + '" data-name="'+list.masp+'" data-vt="' + list.masp + '">' +
             '<td>' + stt + '</td>' +
             '<td>' + list.masp+'</td>'+
             '<td>' + list.tensp+'</td>'+
             '<td>' + list.ngaysx+'</td>'+
             '<td>' + list.slt+'</td>'+
             '<td>' + list.imgnuoc+'</td>'+
             '<td>' + list.giagoc+'</td>'+
             '<td>' + list.giamgia+'</td>'+
             '<td>' + list.giaban+'</td>'+
             '<td class="click_sua_san_pham"><i class="fa fa-eye"></i></td>'+
             '</tr>';
         stt++;
 
         $(".listdssanpham").html(html)
    }
    buildSlidePage($(".pagenumbersanpham"),5,res.page,res.totalpage);
    }
}
 var sanpham_current=0;
 $(".pagenumbersanpham").on('click','button',function () {
     
     sanpham_current=$(this).val();
     builddssanpham($(this).val(),recordsanpham);
     
 });
 $(".listdssanpham").on('click',".click_sua_san_pham",function () {
    var masp=($(this).parents("tr").attr("data-masp"));
    $(".txtmasp").val(resallsanpham[masp].masp);
    $(".txttensp").val(resallsanpham[masp].tensp);
    $(".txtngaysxsp").val(resallsanpham[masp].ngaysx);
    $(".txtslt").val(resallsanpham[masp].slt);
    $(".txtimgnuoc").val(resallsanpham[masp].imgnuoc);
    $(".txtgiagoc").val(resallsanpham[masp].giagoc);
    $(".txtgiamgia").val(resallsanpham[masp].giamgia);
    $(".txtgiaban").val(resallsanpham[masp].giaban);
    });