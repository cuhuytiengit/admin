//(khach_hang)click thêm - lưu - làm lại
$(".btn_themnhanvien").click(function(){
    var manv=$(".txtmanv").val();//lấy giá trị từ ô nhập liệu
    var tennv=$(".txttennv").val();
    var gtnv=$(".txtgtnv").val();
    var nsnv=$(".txtnsnv").val();
    var sdtnv=$(".txtsdtnv").val();
    var quequannv=$(".txtquequannv").val();
    var thuongtrunv=$(".txtthuongtrunv").val();
    var emailnv=$(".txtemailnv").val();
    var manvql=$(".txtmanvql").val();
    if(manv==""){
        alert_info("Mã nhân viên phải khác khoảng trống!");}
    else if(tennv==""){
        alert_info("Tên nhân viên phải khác khoảng trống!");}
    else if(gtnv==""){
        alert_info("Giới tính nhân viên phải khác khoảng trống!");}
    else if(nsnv==""){
        alert_info("Ngày sinh nhân viên phải khác khoảng trống!");}
    else if(sdtnv==""||isNumber(sdtnv)==false){
        alert_info("Số điện thoại nhân viên không hợp lệ!");}
    else if(quequannv==""){
        alert_info("Quê quán nhân viên khác phải khoảng trống!");}
    else if(thuongtrunv==""){
        alert_info("Thường trú nhân viên khác phải khoảng trống!");}
    else if(emailnv==""||validateEmail(emailnv)==false){
        alert_info("Email nhân viên không hợp lệ!");}
    else if(manvql==""){
        alert_info("Mã nhân viên quản lý phải khác khoảng trống!");}
    else{
        var datasend={
            event:"insert",
            manv:manv,
            tennv:tennv,
            gtnv:gtnv,
            nsnv:nsnv,
            sdtnv:sdtnv,
            quequannv:quequannv,
            thuongtrunv:thuongtrunv,
            emailnv:emailnv,
            manvql:manvql
        }
        queryDataGET_JSON("php/nhan_vien.php", datasend, function(res){
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
$(".btn_suanhanvien").click(function(){
    var manv=$(".txtmanv").val();//lấy giá trị từ ô nhập liệu
    var tennv=$(".txttennv").val();
    var gtnv=$(".txtgtnv").val();
    var nsnv=$(".txtnsnv").val();
    var sdtnv=$(".txtsdtnv").val();
    var quequannv=$(".txtquequannv").val();
    var thuongtrunv=$(".txtthuongtrunv").val();
    var emailnv=$(".txtemailnv").val();
    var manvql=$(".txtmanvql").val();
    if(manv==""){
        alert_info("Mã nhân viên phải khác khoảng trống!");}
    else if(tennv==""){
        alert_info("Tên nhân viên phải khác khoảng trống!");}
    else if(gtnv==""){
        alert_info("Giới tính nhân viên phải khác khoảng trống!");}
    else if(nsnv==""){
        alert_info("Ngày sinh nhân viên phải khác khoảng trống!");}
    else if(sdtnv==""||isNumber(sdtnv)==false){
        alert_info("Số điện thoại nhân viên không hợp lệ!");}
    else if(quequannv==""){
        alert_info("Quê quán nhân viên khác phải khoảng trống!");}
    else if(thuongtrunv==""){
        alert_info("Thường trú nhân viên khác phải khoảng trống!");}
    else if(emailnv==""||validateEmail(emailnv)==false){
        alert_info("Email nhân viên không hợp lệ!");}
    else if(manvql==""){
        alert_info("Mã nhân viên quản lý phải khác khoảng trống!");}
    else{
        bootbox.confirm("Bạn có chắc sửa thể loại có manv: '" + manv + "' ?",
        function(result){
            if(result==true)//Nếu nhấn ok
            {
                var datasend={
                    event:"update",
                    manv:manv,
                    tennv:tennv,
                    gtnv:gtnv,
                    nsnv:nsnv,
                    sdtnv:sdtnv,
                    quequannv:quequannv,
                    thuongtrunv:thuongtrunv,
                    emailnv:emailnv,
                    manvql:manvql
                }
                queryDataGET_JSON("php/nhan_vien.php",datasend,function(res){
                    console.log(res);
                    if(res["update"]==1){
                        
                        alert_info("Sửa thành công trang số: " + nhanvien_current);
                        builddsnhanvien(nhanvien_current,recordnhanvien);
                        $("txtmanv").val("");
                        $("txttennv").val("");
                        $("txtgtnv").val("");
                        $("txtnsnv").val("");
                        $("txtsdtnv").val("");
                        $("txtquequannv").val("");
                        $("txtthuongtrunv").val("");
                        $("txtemailnv").val("");
                        $("txtmanvql").val("");
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
$(".btn_lamlainhanvien").click(function(){
    $(".txtmanv").val("");//THAY giá trị từ ô nhập liệu về mặc định
    $(".txttennv").val("");
    $(".txtgtnv").val("");
    $(".txtnsnv").val("");
    $(".txtsdtnv").val("");
    $(".txtquequannv").val("");
    $(".txtthuongtrunv").val("");
    $(".txtemailnv").val("");
    $(".txtmanvql").val("");
});
$(".btn_xoanhanvien").click(function(){
    var manv=$(".txtmanv").val();//lấy giá trị từ ô nhập liệu

    if(manv==""){
        alert_info("Mã nhân viên phải khác khoảng trống!");}
    else {
        bootbox.confirm("Bạn có chắc xóa nhân viên có manv: '" + manv + "' ?",
        function(result){
            if(result==true){
                var datasend={
                    event:"delete",
                    manv:manv
                }
                queryDataGET_JSON("php/nhan_vien.php",datasend,function(res){
                    console.log(res);
                    if(res["delete"]==1){
                        alert_info("Xóa thành công!");
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

//Hiển thị dữ liệu nhan_vien lấy JSON từ server
function builddsnhanvien(page,record) {
   
    var dataSend={
		event:"getDSNhanVien",
		page:page,
        record:record
    }
    
    $(".listdsnhanvien").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/nhan_vien.php",dataSend,function (res) {
            $(".listdsnhanvien").html("");
            buildHTMLNhanVienData(res);
            //alert_info("Đã lấy được dữ liệu " + res);
    });
}

function buildHTMLNhanVienData(res) {
    if(res.total==0){
        $(".listdsnhanvien").html("Chưa có nội dung");
         
    }else{  
     var data = res.items;
    
     resallnhanvien=data;
     var stt=1;
    var currentpage=parseInt(res.page);
     stt=printSTT(recordnhanvien,currentpage);
     var html='';
     var vt=0;
     for (item in data) {
         var list=data[item];
       
         html=html +
             '<tr data-manv="' + list.manv + '" data-name="'+list.manv+'" data-vt="' + list.manv + '">' +
             '<td>' + stt + '</td>' +
             '<td>' + list.manv+'</td>'+
             '<td>' + list.tennv+'</td>'+
             '<td>' + list.gtnv+'</td>'+
             '<td>' + list.nsnv+'</td>'+
             '<td>' + list.sdtnv+'</td>'+
             '<td>' + list.quequannv+'</td>'+
             '<td>' + list.thuongtrunv+'</td>'+
             '<td>' + list.emailnv+'</td>'+
             '<td>' + list.manvql+'</td>'+
             '<td class="click_sua_nhan_vien"><i class="fa fa-eye"></i></td>'+
             '</tr>';
         stt++;
 
         $(".listdsnhanvien").html(html)
     }
     buildSlidePage($(".pagenumbernhanvien"),5,res.page,res.totalpage);
    }
 }
 var nhanvien_current=0;
 $(".pagenumbernhanvien").on('click','button',function () {
     
     nhanvien_current=$(this).val();
     builddsnhanvien($(this).val(),recordnhanvien);
     
 });

$(".listdsnhanvien").on('click','.click_sua_nhan_vien',function () {
var manv=($(this).parents("tr").attr("data-manv"));
    $(".txtmanv").val(resallnhanvien[manv].manv);
    $(".txttennv").val(resallnhanvien[manv].tennv);
    $(".txtgtnv").val(resallnhanvien[manv].gtnv);
    $(".txtnsnv").val(resallnhanvien[manv].nsnv);
    $(".txtsdtnv").val(resallnhanvien[manv].sdtnv);
    $(".txtquequannv").val(resallnhanvien[manv].quequannv);
    $(".txtthuongtrunv").val(resallnhanvien[manv].thuongtrunv);
    $(".txtemailnv").val(resallnhanvien[manv].emailnv);
    $(".txtmanvql").val(resallnhanvien[manv].manvql);
});