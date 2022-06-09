//(thể loại Lavie)click thêm - lưu - làm lại
$(".btn_themtlsp").click(function(){
    var matl_tlsp=$(".txtmatl_tlsp").val();//lấy giá trị từ ô nhập liệu
    var masp_tlsp=$(".txtmasp_tlsp").val();
    if(matl_tlsp==""){
        alert_info("Mã thể loại khác khoảng trống!");}
    else if(masp_tlsp==""){
        alert_info("Mã sản phẩm khác khoảng trống!");}
    else{
        var datasend={
            event:"insert",
            matl_tlsp:matl_tlsp,
            masp_tlsp:masp_tlsp
        }
        queryDataGET_JSON("php/lktg_tl_sp.php", datasend, function(res){
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
$(".btn_suatlsp").click(function(){
    var matl_tlsp=$(".txtmatl_tlsp").val();//lấy giá trị từ ô nhập liệu
    var masp_tlsp=$(".txtmasp_tlsp").val();
    if(matl_tlsp==""){
        alert_info("Mã thể loại phải khác khoảng trống!");}
    else if(masp_tlsp==""){
        alert_info("Mã sản phẩm phải khác khoảng trống!");}
    else{
        bootbox.confirm("Bạn có chắc sửa thể loại có matl_tlsp: '" + matl_tlsp + "' ?",
        function(result){
            if(result==true)//Nếu nhấn ok
            {
                var datasend={
                    event:"update",
                    matl_tlsp:matl_tlsp,
                    masp_tlsp:masp_tlsp
                }
                queryDataGET_JSON("php/lktg_tl_sp.php",datasend,function(res){
                    console.log(res);
                    if(res["update"]==1){
                        
                        alert_info("Sửa thành công trang số: " + tlsp_current);
                        builddstlsp(tlsp_current,recordtlsp);
                        $("txtmatl_tlsp").val("");
                        $("txtmasp_tlsp").val("");
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
$(".btn_lamlaitlsp").click(function(){
    $(".txtmatl_tlsp").val("");//THAY giá trị từ ô nhập liệu về mặc định
    $(".txtmasp_tlsp").val("");
});
$(".btn_xoatlsp").click(function(){
    var matl_tlsp=$(".txtmatl_tlsp").val();
    if(matl_tlsp==""){
        alert_info("Mã thể loại phải khác khoảng trống!");}
    else{
        bootbox.confirm("Bạn có chắc xóa thể loại có matl_tlsp: '" + matl_tlsp + "' ?",
        function(result){
            if(result==true)
            {
                var datasend={
                    event:"delete",
                    matl_tlsp:matl_tlsp
                }
                queryDataGET_JSON("php/lktg_tl_sp.php",datasend,function(res){
                    console.log(res);
                    if(res["delete"]==1){
                        alert_info("Xoa thanh cong trang so: " + tlsp_current);
                        builddstlsp(tlsp_current,recordtlsp);
                        $("txtmatl_tlsp").val("");
                        $("txtmasp_tlsp").val("");
                    }

                    else{
                        alert_error("Xoa khong thanh cong");}
                });
            }
        });
    } 
});

//Hiển thị dữ liệu lktg_tl_sp lấy JSON từ server
function builddstlsp(page,record) {
   
    var dataSend={
		event:"getDStlsp",
		page:page,
        record:record
    }
    
    $(".listdstlsp").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/lktg_tl_sp.php",dataSend,function (res) {
            $(".listdstlsp").html("");
            buildHTMLtlspData(res);
            //alert_info("Đã lấy được dữ liệu " + res);
    });
}

var resalltlsp;
function buildHTMLtlspData(res) {
    if(res.total==0){
         $(".listdstlsp").html("Chưa có nội dung");
         
    }else{
     var data = res.items;
    
     resalltlsp=data;
     var stt=1;
    var currentpage=parseInt(res.page);
     stt=printSTT(recordtlsp,currentpage);
     var html='';
     var vt=0;
     for (item in data) {
         var list=data[item];
       
         html=html +
             '<tr data-matl_tlsp="' + list.matl_tlsp + '" data-name="'+list.matl_tlsp+'" data-vt="' + list.matl_tlsp + '">' +
             '<td>' + stt + '</td>' +
             '<td>' + list.matl_tlsp+'</td>'+
             '<td>' + list.masp_tlsp+'</td>'+
             '<td class="click_sua_lktg_tl_sp"><i class="fa fa-eye"></i></td>'+
             '</tr>';
         stt++;
 
         $(".listdstlsp").html(html)
     }
     buildSlidePage($(".pagenumbertlsp"),5,res.page,res.totalpage);
    }
 }
 var tlsp_current=0;
 $(".pagenumbertlsp").on('click','button',function () {
     
     tlsp_current=$(this).val();
     builddstlsp($(this).val(),recordtlsp);
     
 });
 $(".listdstlsp").on('click',".click_sua_lktg_tl_sp",function () {
    var matl_tlsp=($(this).parents("tr").attr("data-matl_tlsp"));
    $(".txtmatl_tlsp").val(resalltlsp[matl_tlsp].matl_tlsp);
    $(".txtmasp_tlsp").val(resalltlsp[matl_tlsp].masp_tlsp);
    });