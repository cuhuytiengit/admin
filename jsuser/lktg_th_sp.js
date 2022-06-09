//(thể loại Lavie)click thêm - lưu - làm lại
$(".btn_themthsp").click(function(){
    var math_thsp=$(".txtmath_thsp").val();//lấy giá trị từ ô nhập liệu
    var masp_thsp=$(".txtmasp_thsp").val();
    if(math_thsp==""){
        alert_info("Mã thương hiệu khác khoảng trống!");}
    else if(masp_thsp==""){
        alert_info("Mã sản phẩm khác khoảng trống!");}
    else{
        var datasend={
            event:"insert",
            math_thsp:math_thsp,
            masp_thsp:masp_thsp
        }
        queryDataGET_JSON("php/lktg_th_sp.php", datasend, function(res){
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
$(".btn_suathsp").click(function(){
    var math_thsp=$(".txtmath_thsp").val();//lấy giá trị từ ô nhập liệu
    var masp_thsp=$(".txtmasp_thsp").val();
    if(math_thsp==""){
        alert_info("Mã thương hiệu phải khác khoảng trống!");}
    else if(masp_thsp==""){
        alert_info("Mã sản phẩm phải khác khoảng trống!");}
    else{
        bootbox.confirm("Bạn có chắc sửa thể loại có math_thsp: '" + math_thsp + "' ?",
        function(result){
            if(result==true)//Nếu nhấn ok
            {
                var datasend={
                    event:"update",
                    math_thsp:math_thsp,
                    masp_thsp:masp_thsp
                }
                queryDataGET_JSON("php/lktg_th_sp.php",datasend,function(res){
                    console.log(res);
                    if(res["update"]==1){
                        
                        alert_info("Sửa thành công trang số: " + thsp_current);
                        builddsthsp(thsp_current,recordthsp);
                        $("txtmath_thsp").val("");
                        $("txtmasp_thsp").val("");
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
$(".btn_lamlaithsp").click(function(){
    $(".txtmath_thsp").val("");//THAY giá trị từ ô nhập liệu về mặc định
    $(".txtmasp_thsp").val("");
});
$(".btn_xoathsp").click(function(){
    var math_thsp=$(".txtmath_thsp").val();
    if(math_thsp==""){
        alert_info("Mã thương hiệu phải khác khoảng trống!");}
    else{
        bootbox.confirm("Bạn có chắc xóa thể loại có math_thsp: '" + math_thsp + "' ?",
        function(result){
            if(result==true)
            {
                var datasend={
                    event:"delete",
                    math_thsp:math_thsp
                }
                queryDataGET_JSON("php/lktg_th_sp.php",datasend,function(res){
                    console.log(res);
                    if(res["delete"]==1){
                        alert_info("Xoa thanh cong trang so: " + thsp_current);
                        builddsthsp(thsp_current,recordthsp);
                        $("txtmath_thsp").val("");
                        $("txtmasp_thsp").val("");
                    }

                    else{
                        alert_error("Xoa khong thanh cong");}
                });
            }
        });
    } 
});

//Hiển thị dữ liệu lktg_th_sp lấy JSON từ server
function builddsthsp(page,record) {
   
    var dataSend={
		event:"getDSthsp",
		page:page,
        record:record
    }
    
    $(".listdsthsp").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/lktg_th_sp.php",dataSend,function (res) {
            $(".listdsthsp").html("");
            buildHTMLthspData(res);
            //alert_info("Đã lấy được dữ liệu " + res);
    });
}

var resallthsp;
function buildHTMLthspData(res) {
    if(res.total==0){
         $(".listdsthsp").html("Chưa có nội dung");
         
    }else{
     var data = res.items;
    
     resallthsp=data;
     var stt=1;
    var currentpage=parseInt(res.page);
     stt=printSTT(recordthsp,currentpage);
     var html='';
     var vt=0;
     for (item in data) {
         var list=data[item];
       
         html=html +
             '<tr data-math_thsp="' + list.math_thsp + '" data-name="'+list.math_thsp+'" data-vt="' + list.math_thsp + '">' +
             '<td>' + stt + '</td>' +
             '<td>' + list.math_thsp+'</td>'+
             '<td>' + list.masp_thsp+'</td>'+
             '<td class="click_sua_lktg_th_sp"><i class="fa fa-eye"></i></td>'+
             '</tr>';
         stt++;
 
         $(".listdsthsp").html(html)
     }
     buildSlidePage($(".pagenumberthsp"),5,res.page,res.totalpage);
    }
 }
 var thsp_current=0;
 $(".pagenumberthsp").on('click','button',function () {
     
     thsp_current=$(this).val();
     builddsthsp($(this).val(),recordthsp);
     
 });
 $(".listdsthsp").on('click',".click_sua_lktg_th_sp",function () {
    var math_thsp=($(this).parents("tr").attr("data-math_thsp"));
    $(".txtmath_thsp").val(resallthsp[math_thsp].math_thsp);
    $(".txtmasp_thsp").val(resallthsp[math_thsp].masp_thsp);
    });