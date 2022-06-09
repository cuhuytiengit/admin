//(thuong_hieu)click thêm - lưu - làm lại
$(".btn_themthuonghieu").click(function(){
    var math=$(".txtmath").val();//lấy giá trị từ ô nhập liệu
    var tenth=$(".txttenth").val();
    var sdtth=$(".txtsdtth").val();
    var diachith=$(".txtdiachith").val();
    var emailth=$(".txtemailth").val();
    if(math==""){
        alert_info("Mã thương hiệu phải khác khoảng trống!");}
    else if(tenth==""){
        alert_info("Tên thương hiệu phải khác khoảng trống!");}
    else if(sdtth==""||isNumber(sdtth)==false){
        alert_info("Số điện thoai thương hiệu không hợp lệ!");}
    else if(diachith==""){
        alert_info("Địa chỉ thương hiệu khác phải khoảng trống!");}
    else if(emailth==""||validateEmail(emailth)==false){
        alert_info("Email thương hiệu không hợp lệ!");}
    else{
        var datasend={
            event:"insert",
            math:math,
            tenth:tenth,
            sdtth:sdtth,
            diachith:diachith,
            emailth:emailth
        }
        queryDataGET_JSON("php/thuong_hieu.php", datasend, function(res){
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
$(".btn_suathuonghieu").click(function(){
    var math=$(".txtmath").val();//lấy giá trị từ ô nhập liệu
    var tenth=$(".txttenth").val();
    var sdtth=$(".txtsdtth").val();
    var diachith=$(".txtdiachith").val();
    var emailth=$(".txtemailth").val();
    if(math==""){
        alert_info("Mã thương hiệu phải khác khoảng trống!");}
    else if(tenth==""){
        alert_info("Tên thương hiệu phải khác khoảng trống!");}
    else if(sdtth==""||isNumber(sdtth)==false){
        alert_info("Số điện thoai thương hiệu phải khác khoảng trống!");}
    else if(diachith==""){
        alert_info("Địa chỉ thương hiệu khác phải khoảng trống!");}
    else if(emailth==""||validateEmail(emailth)==false){
        alert_info("Email thương hiệu không hợp lệ!");}
    else{
        bootbox.confirm("Bạn có chắc sửa thể loại có math: '" + math + "' ?",
        function(result){
            if(result==true)//Nếu nhấn ok
            {
                var datasend={
                    event:"update",
                    math:math,
                    tenth:tenth,
                    sdtth:sdtth,
                    diachith:diachith,
                    emailth:emailth
                }
                queryDataGET_JSON("php/thuong_hieu.php",datasend,function(res){
                    console.log(res);
                    if(res["update"]==1){
                        
                        alert_info("Sửa thành công trang số: " + thuonghieu_current);
                        builddsthuonghieu(thuonghieu_current,recordthuonghieu);
                        $("txtmath").val("");
                        $("txttenth").val("");
                        $("txtsdtth").val("");
                        $("txtdiachith").val("");
                        $("txtemailth").val("");
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
$(".btn_lamlaithuonghieu").click(function(){
    $(".txtmath").val("");//THAY giá trị từ ô nhập liệu về mặc định
    $(".txttenth").val("");
    $(".txtsdtth").val("");
    $(".txtdiachith").val("");
    $(".txtemailth").val("");
});
$(".btn_xoathuonghieu").click(function(){
    var math=$(".txtmath").val();//lấy giá trị từ ô nhập liệu

    if(math==""){
        alert_info("Mã nhà sản xuất phải khác khoảng trống!");}
    else {
        bootbox.confirm("Bạn có chắc xóa thương hiệu có math: '" + math + "'?",
        function(result){
            if(result==true){
                var datasend={
                    event:"delete",
                    math:math
                }
                queryDataGET_JSON("php/thuong_hieu.php",datasend,function(res){
                    console.log(res);
                    if(res["delete"]==1){
                        alert_info("Xóa thành công!");
                    }
                    else{
                        alert_error("Xóa không thành công!");
                    }
                });
            }
            else{}
        });
    }
});

//Hiển thị dữ liệu thuong_hieu lấy JSON từ server
function builddsthuonghieu(page,record) {
   
    var dataSend={
		event:"getDSThuongHieu",
		page:page,
        record:record
    }
    
    $(".listdsthuonghieu").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/thuong_hieu.php",dataSend,function (res) {
            $(".listdsthuonghieu").html("");
            buildHTMLThuongHieuData(res);
            //alert_info("Đã lấy được dữ liệu " + res);
    });
}
//Hiển thị dữ liệu lấy JSON từ server
function buildHTMLThuongHieuData(res) {
    if(res.total==0){
         $(".listdsthuonghieu").html("Chưa có nội dung");
         
    }else{  
     var data = res.items;
    
     resallthuonghieu=data;
     var stt=1;
    var currentpage=parseInt(res.page);
     stt=printSTT(recordthuonghieu,currentpage);
     var html='';
     var vt=0;
     for (item in data) {
         var list=data[item];
       
         html=html +
             '<tr data-math="' + list.math + '" data-name="'+list.math+'" data-vt="' + list.math + '">' +
             '<td>' + stt + '</td>' +
             '<td>' + list.math+'</td>'+
             '<td>' + list.tenth+'</td>'+
             '<td>' + list.sdtth+'</td>'+
             '<td>' + list.diachith+'</td>'+
             '<td>' + list.emailth+'</td>'+
             '<td class="click_sua_thuong_hieu"><i class="fa fa-eye"></i></td>'+
             '</tr>';
         stt++;

         $(".listdsthuonghieu").html(html)
     }
     buildSlidePage($(".pagenumberthuonghieu"),5,res.page,res.totalpage);
    }
 }
 var thuonghieu_current=0;
 $(".pagenumberthuonghieu").on('click','button',function () {
     
     thuonghieu_current=$(this).val();
     builddsthuonghieu($(this).val(),recordthuonghieu);
     
 });

$(".listdsthuonghieu").on('click','.click_sua_thuong_hieu',function () {
    var math=($(this).parents("tr").attr("data-math"));
    $(".txtmath").val(resallthuonghieu[math].math);
    $(".txttenth").val(resallthuonghieu[math].tenth);
    $(".txtsdtth").val(resallthuonghieu[math].sdtth);
    $(".txtdiachith").val(resallthuonghieu[math].diachith);
    $(".txtemailth").val(resallthuonghieu[math].emailth);
});