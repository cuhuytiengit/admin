//(thể loại Lavie)click thêm - lưu - làm lại
$(".btn_themnccth").click(function(){
    var mancc_nccth=$(".txtmancc_nccth").val();//lấy giá trị từ ô nhập liệu
    var math_nccth=$(".txtmath_nccth").val();
    if(mancc_nccth==""){
        alert_info("Mã nhà cung cấp phải khác khoảng trống!");}
    else if(math_nccth==""){
        alert_info("Mã thương hiệu khác khoảng trống!");}
    else{
        var datasend={
            event:"insert",
            mancc_nccth:mancc_nccth,
            math_nccth:math_nccth
        }
        queryDataGET_JSON("php/lktg_ncc_th.php", datasend, function(res){
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

$(".btn_suanccth").click(function(){
    var mancc_nccth=$(".txtmancc_nccth").val();//lấy giá trị từ ô nhập liệu
    var math_nccth=$(".txtmath_nccth").val();
    if(mancc_nccth==""){
        alert_info("Mã nhà cung cấp phải khác khoảng trống!");}
    else if(math_nccth==""){
        alert_info("Mã thương hiệu phải khác khoảng trống!");}
    else{
        bootbox.confirm("Bạn có chắc sửa thể loại có mancc_nccth: '" + mancc_nccth + "' ?",
        function(result){
            if(result==true)//Nếu nhấn ok
            {
                var datasend={
                    event:"update",
                    mancc_nccth:mancc_nccth,
                    math_nccth:math_nccth
                }
                queryDataGET_JSON("php/lktg_ncc_th.php",datasend,function(res){
                    console.log(res);
                    if(res["update"]==1){
                        
                        alert_info("Sửa thành công trang số: " + nccth_current);
                        builddsnccth(nccth_current,recordnccth);
                        $("txtmancc_nccth").val("");
                        $("txtmath_nccth").val("");
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
$(".btn_lamlainccth").click(function(){
    $(".txtmancc_nccth").val("");//THAY giá trị từ ô nhập liệu về mặc định
    $(".txtmath_nccth").val("");
});
$(".btn_xoanccth").click(function(){
    var mancc_nccth=$(".txtmancc_nccth").val();
    if(mancc_nccth==""){
        alert_info("Mã nhà cung cấp phải khác khoảng trống!");}
    else{
        bootbox.confirm("Bạn có chắc xóa thể loại có mancc_nccth: '" + mancc_nccth + "' ?",
        function(result){
            if(result==true)
            {
                var datasend={
                    event:"delete",
                    mancc_nccth:mancc_nccth
                }
                queryDataGET_JSON("php/lktg_ncc_th.php",datasend,function(res){
                    console.log(res);
                    if(res["delete"]==1){
                        alert_info("Xoa thanh cong trang so: " + nccth_current);
                        builddsnccth(nccth_current,recordnccth);
                        $("txtmancc_nccth").val("");
                        $("txtmath_nccth").val("");
                    }

                    else{
                        alert_error("Xoa khong thanh cong");}
                });
            }
        });
    } 
});

//Hiển thị dữ liệu lktg_ncc_th lấy JSON từ server
function builddsnccth(page,record) {
   
    var dataSend={
		event:"getDSnccth",
		page:page,
        record:record
    }
    
    $(".listdsnccth").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/lktg_ncc_th.php",dataSend,function (res) {
            $(".listdsnccth").html("");
            buildHTMLnccthData(res);
            //alert_info("Đã lấy được dữ liệu " + res);
    });
}

var resallnccth;
function buildHTMLnccthData(res) {
    if(res.total==0){
         $(".listdsnccth").html("Chưa có nội dung");
         
    }else{
     var data = res.items;
    
     resallnccth=data;
     var stt=1;
    var currentpage=parseInt(res.page);
     stt=printSTT(recordnccth,currentpage);
     var html='';
     var vt=0;
     for (item in data) {
         var list=data[item];
       
         html=html +
             '<tr data-mancc_nccth="' + list.mancc_nccth + '" data-name="'+list.mancc_nccth+'" data-vt="' + list.mancc_nccth + '">' +
             '<td>' + stt + '</td>' +
             '<td>' + list.mancc_nccth+'</td>'+
             '<td>' + list.math_nccth+'</td>'+
             '<td class="click_sua_lktg_ncc_th"><i class="fa fa-eye"></i></td>'+
             '</tr>';
         stt++;
 
         $(".listdsnccth").html(html)
     }
     buildSlidePage($(".pagenumbernccth"),5,res.page,res.totalpage);
    }
 }
 var nccth_current=0;
 $(".pagenumbernccth").on('click','button',function () {
     
     nccth_current=$(this).val();
     builddsnccth($(this).val(),recordnccth);
     
 });
 $(".listdsnccth").on('click',".click_sua_lktg_ncc_th",function () {
    var mancc_nccth=($(this).parents("tr").attr("data-mancc_nccth"));
    $(".txtmancc_nccth").val(resallnccth[mancc_nccth].mancc_nccth);
    $(".txtmath_nccth").val(resallnccth[mancc_nccth].math_nccth);
    });