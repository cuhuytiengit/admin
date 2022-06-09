//(khach_hang)click thêm - lưu - làm lại
$(".btn_themkhachhang").click(function(){
    var makh=$(".txtmakh").val();//lấy giá trị từ ô nhập liệu
    var tenkh=$(".txttenkh").val();
    var sdtkh=$(".txtsdtkh").val();
    var diachikh=$(".txtdiachikh").val();
    var emailkh=$(".txtemailkh").val();
    if(makh==""){
        alert_info("Mã khách hàng phải khác khoảng trống!");}
    else if(tenkh==""){
        alert_info("Tên khách hàng phải khác khoảng trống!");}
    else if(sdtkh==""||isNumber(sdtkh)==false){
        alert_info("Số điện thoai khách hàng không hợp lệ!");}
    else if(diachikh==""){
        alert_info("Địa chỉ khách hàng khác phải khoảng trống!");}
    else if(emailkh==""||validateEmail(emailkh)==false){
        alert_info("Email khách hàng không hợp lệ!");}
    else{
        var datasend={
            event:"insert",
            makh:makh,
            tenkh:tenkh,
            sdtkh:sdtkh,
            diachikh:diachikh,
            emailkh:emailkh
        }
        queryDataGET_JSON("php/khach_hang.php", datasend, function(res){
            console.log(res);
            if(res["insert"]==1){
                alert_info("Thêm thành công!");
            }
            else{
                alert_error("Thêm không thành công!");
            }
        });
    }
});
$(".btn_suakhachhang").click(function(){
    var makh=$(".txtmakh").val();//lấy giá trị từ ô nhập liệu
    var tenkh=$(".txttenkh").val();
    var sdtkh=$(".txtsdtkh").val();
    var diachikh=$(".txtdiachikh").val();
    var emailkh=$(".txtemailkh").val();
    if(makh==""){
        alert_info("Mã khách hàng phải khác khoảng trống!");}
    else if(tenkh==""){
        alert_info("Tên khách hàng phải khác khoảng trống!");}
    else if(sdtkh==""||isNumber(sdtkh)==false){
        alert_info("Số điện thoai khách hàng phải khác khoảng trống!");}
    else if(diachikh==""){
        alert_info("Địa chỉ khách hàng khác phải khoảng trống!");}
    else if(emailkh==""||validateEmail(emailkh)==false){
        alert_info("Email khách hàng không hợp lệ!");}
    else{
        bootbox.confirm("Bạn có chắc sửa khách hàng có makh: '" + makh + "' ?",
        function(result){
            if(result==true){
                var datasend={
                    event:"update",
                    makh:makh,
                    tenkh:tenkh,
                    sdtkh:sdtkh,
                    diachikh:diachikh,
                    emailkh:emailkh
                }
                queryDataGET_JSON("php/khach_hang.php",datasend,function(res){
                    console.log(res);
                    if(res["update"]==1){
                        alert_info("Sửa thành công trang số: " + khachhang_current);
                        builddskhachhang(khachhang_current,recordkhachhang);
                        $(".txtmakh").val("");//THAY giá trị từ ô nhập liệu về mặc định
                        $(".txttenkh").val("");
                        $(".txtsdtkh").val("");
                        $(".txtdiachikh").val("");
                        $(".txtemailkh").val("");
                    }
                    else{
                        alert_error("Sửa không thành công!")
                    }
                });
            }
            else{}
        });
    }
});
$(".btn_lamlaikhachhang").click(function(){
    $(".txtmakh").val("");//THAY giá trị từ ô nhập liệu về mặc định
    $(".txttenkh").val("");
    $(".txtsdtkh").val("");
    $(".txtdiachikh").val("");
    $(".txtemailkh").val("");
});
$(".btn_xoakhachhang").click(function(){
    var makh=$(".txtmakh").val();//lấy giá trị từ ô nhập liệu

    if(makh==""){
        alert_info("Mã khách hàng phải khác khoảng trống!");}
    else {
        bootbox.confirm("Bạn có chắc xóa khách hàng có makh: '" + makh + "' ?",
        function(result){
            if(result==true){
                var datasend={
                    event:"delete",
                    makh:makh
                }
                queryDataGET_JSON("php/khach_hang.php",datasend,function(res){
                    console.log(res);
                    if(res["delete"]==1){
                        alert_info("Xóa thành công!");
                        builddskhachhang(khachhang_current,recordkhachhang);
                    }
                    else{
                        alert_error("Xóa không thành công!")
                    }
                });
            }
            else{}
        });
    }
});

 //Hiển thị dữ liệu khach_hang lấy JSON từ server
 function builddskhachhang(page,record) {
   
    var dataSend={
		event:"getDSKhachHang",
		page:page,
        record:record
    }
    
    $(".listdskhachhang").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/khach_hang.php",dataSend,function (res) {
            $(".listdskhachhang").html("");
            buildHTMLKhachHangData(res);
            //alert_info("Đã lấy được dữ liệu " + res);
    });
}

function buildHTMLKhachHangData(res) {
    if(res.total==0){
        $(".listdskhachhang").html("Chưa có nội dung");
         
    }else{  
     var data = res.items;
    
     resallkhachhang=data;
     var stt=1;
    var currentpage=parseInt(res.page);
     stt=printSTT(recordkhachhang,currentpage);
     var html='';
     var vt=0;
     for (item in data) {
         var list=data[item];
       
         html=html +
             '<tr data-makh="' + list.makh + '" data-name="'+list.makh+'" data-vt="' + list.makh + '">' +
             '<td>' + stt + '</td>' +
             '<td>' + list.makh+'</td>'+
             '<td>' + list.tenkh+'</td>'+
             '<td>' + list.sdtkh+'</td>'+
             '<td>' + list.diachikh+'</td>'+
             '<td>' + list.emailkh+'</td>'+
             '<td class="click_sua_khach_hang"><i class="fa fa-eye"></i></td>'+
             '</tr>';
         stt++;

         $(".listdskhachhang").html(html)
     }
     buildSlidePage($(".pagenumberkhachhang"),5,res.page,res.totalpage);
    }
 }
 var khachhang_current=0;
 $(".pagenumberkhachhang").on('click','button',function () {
     
     khachhang_current=$(this).val();
     builddskhachhang($(this).val(),recordkhachhang);
     
 });

 //Sự kiện ckick icon mắt(để xem thông tin hiển thị trên thanh 'text')
 $(".listdskhachhang").on('click','.click_sua_khach_hang',function () {
    var makh=($(this).parents("tr").attr("data-makh"));
    $(".txtmakh").val(resallkhachhang[makh].makh);
    $(".txttenkh").val(resallkhachhang[makh].tenkh);
    $(".txtsdtkh").val(resallkhachhang[makh].sdtkh);
    $(".txtdiachikh").val(resallkhachhang[makh].diachikh);
    $(".txtemailkh").val(resallkhachhang[makh].emailkh);
    });