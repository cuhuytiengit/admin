//(ncc)click thêm - lưu - làm lại
$(".btn_themnhacungcap").click(function(){
    var mancc=$(".txtmancc").val();//lấy giá trị từ ô nhập liệu
    var tenncc=$(".txttenncc").val();
    var sdtncc=$(".txtsdtncc").val();
    var diachincc=$(".txtdiachincc").val();
    var emailncc=$(".txtemailncc").val();
    if(mancc==""){
        alert_info("Mã nhà nhà cung cấp phải khác khoảng trống!");}
    else if(tenncc==""){
        alert_info("Tên nhà nhà cung cấp phải khác khoảng trống!");}
    else if(sdtncc==""||isNumber(sdtncc)==false){
        alert_info("Số điện thoai nhà nhà cung cấp phải khác khoảng trống!");}
    else if(diachincc==""){
        alert_info("Địa chỉ nhà nhà cung cấp khác phải khoảng trống!");}
    else if(emailncc==""||validateEmail(emailncc)==false){
        alert_info("Email nhà nhà cung cấp khác phải khoảng trống!");}
    else{
        var datasend={
            event:"insert",
            mancc:mancc,
            tenncc:tenncc,
            sdtncc:sdtncc,
            diachincc:diachincc,
            emailncc:emailncc
        }
        queryDataGET_JSON("php/nha_cung_cap.php", datasend, function(res){
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
$(".btn_suanhacungcap").click(function(){
    var mancc=$(".txtmancc").val();//lấy giá trị từ ô nhập liệu
    var tenncc=$(".txttenncc").val();
    var sdtncc=$(".txtsdtncc").val();
    var diachincc=$(".txtdiachincc").val();
    var emailncc=$(".txtemailncc").val();
    if(mancc==""){
        alert_info("Mã nhà nhà cung cấp phải khác khoảng trống!");}
    else if(tenncc==""){
        alert_info("Tên nhà nhà cung cấp phải khác khoảng trống!");}
    else if(sdtncc==""||isNumber(sdtncc)==false){
        alert_info("Số điện thoai nhà nhà cung cấp phải khác khoảng trống!");}
    else if(diachincc==""){
        alert_info("Địa chỉ nhà nhà cung cấp phải khác khoảng trống!");}
    else if(emailncc==""||validateEmail(emailncc)==false){
        alert_info("Email nhà nhà cung cấp phải khác khoảng trống!");}
    else{
        bootbox.confirm("Bạn có chắc sửa nhà cung cấp có mancc là: '" + mancc + "'?",
        function(result){
            if(result==true)
            {
                var datasend={
                    event:"update",
                    mancc:mancc,
                    tenncc:tenncc,
                    sdtncc:sdtncc,
                    diachincc:diachincc,
                    emailncc:emailncc
                }
                queryDataGET_JSON("php/nha_cung_cap.php",datasend,function(res){
                    console.log(res);
                    if(res["update"]==1){
                        alert_info("Sửa thành công trang số: " + nhacungcap_current);
                        builddsnhacungcap(nhacungcap_current,recordnhacungcap);
                        $(".txtmancc").val("");//THAY giá trị từ ô nhập liệu về mặc định
                        $(".txttenncc").val("");
                        $(".txtsdtncc").val("");
                        $(".txtdiachincc").val("");
                        $(".txtemailncc").val("");
                    }else{
                        alert_info("Sửa không thành công!");
                    }
                });
            }else{}
        });
    }
});
$(".btn_lamlainhacungcap").click(function(){
    $(".txtmancc").val("");//THAY giá trị từ ô nhập liệu về mặc định
    $(".txttenncc").val("");
    $(".txtsdtncc").val("");
    $(".txtdiachincc").val("");
    $(".txtemailncc").val("");
});
$(".btn_xoanhacungcap").click(function(){
    var mancc=$(".txtmancc").val();//lấy giá trị từ ô nhập liệu
    if(mancc==""){
        alert("Mã nhà nhà cung cấp phải khác khoảng trống!");}
    else{
        bootbox.confirm("Bạn có chắc xóa nhà cung cấp có mancc: '" + mancc + "'?",
        function(result){
            if(result=true){
                var datasend={
                    event:"delete",
                    mancc:mancc
                }
                queryDataGET_JSON("php/nha_cung_cap.php",datasend,function(res){
                    console.log(res);
                    if(res["delete"]==1){
                        alert_info("Xóa thành công!");
                    }
                    else{
                        alert_error("Xóa không thành công!");
                    }
                });
            }else{}
        });
    }
});

//Hiển thị dữ liệu nha_cung_cap lấy JSON từ server
function builddsnhacungcap(page,record) {
   
    var dataSend={
		event:"getDSNhaCungCap",
		page:page,
        record:record
    }
    
    $(".listdsnhacungcap").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/nha_cung_cap.php",dataSend,function (res) {
            $(".listdsnhacungcap").html("");
            buildHTMLNhaCungCapData(res);
            //alert_info("Đã lấy được dữ liệu " + res);
    });
}
//Hiển thị dữ liệu lấy JSON từ server
function buildHTMLNhaCungCapData(res) {
    if(res.total==0){
         $(".listdsnhacungcap").html("Chưa có nội dung");
         
    }else{  
     var data = res.items;
    
     resallnhacungcap=data;
     var stt=1;
    var currentpage=parseInt(res.page);
     stt=printSTT(recordnhacungcap,currentpage);
     var html='';
     var vt=0;
     for (item in data) {
         var list=data[item];
       
         html=html +
             '<tr data-mancc="' + list.mancc + 
             '" data-name="'+list.mancc+
             '" data-vt="' + list.mancc + '">' +
             '<td>' + stt + '</td>' +
             '<td>' + list.mancc+'</td>'+
             '<td>' + list.tenncc+'</td>'+
             '<td>' + list.sdtncc+'</td>'+
             '<td>' + list.diachincc+'</td>'+
             '<td>' + list.emailncc+'</td>'+
             '<td class="click_sua_nha_cung_cap"><i class="fa fa-eye"></i></td>'+
             '</tr>';
         stt++;

         $(".listdsnhacungcap").html(html)
     }
     buildSlidePage($(".pagenumbernhacungcap"),5,res.page,res.totalpage);
    }
 }
 var nhacungcap_current=0;
 $(".pagenumbernhacungcap").on('click','.button',function () {
     
     nhacungcap_current=$(this).val();
     builddsnhacungcap($(this).val(),recordnhacungcap);
     
 });

$(".listdsnhacungcap").on('click','.click_sua_nha_cung_cap',function () {
    var mancc=($(this).parents("tr").attr("data-mancc"));
    $(".txtmancc").val(resallnhacungcap[mancc].mancc);
    $(".txttenncc").val(resallnhacungcap[mancc].tenncc);
    $(".txtsdtncc").val(resallnhacungcap[mancc].sdtncc);
    $(".txtdiachincc").val(resallnhacungcap[mancc].diachincc);
    $(".txtemailncc").val(resallnhacungcap[mancc].emailncc);
});