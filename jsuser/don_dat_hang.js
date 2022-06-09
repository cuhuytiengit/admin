//(thuong_hieu)click thêm - lưu - làm lại
$(".btn_themdondathang").click(function(){
    var maddh=$(".txtmaddh").val();//lấy giá trị từ ô nhập liệu
    var ngayddh=$(".txtngayddh").val();
    var trangthaiddh=$(".txttrangthaiddh").val();
    var ngkg=$(".txtngaydukiengiao").val();
    var nttg=$(".txtngaythuctegiao").val();
    var makh=$(".txtmakhddh").val();
    var manv=$(".txtmanvddh").val();
    if(maddh==""){
        alert_info("Mã đơn đặt hàng phải khác khoảng trống!");}
    else if(ngayddh==""){
        alert_info("Ngày đặt hàng phải khác khoảng trống!");}
    else if(trangthaiddh==""){
        alert_info("Trạng thái đơn đặt hàng không hợp lệ!");}
    else if(ngkg==""){
        alert_info("Ngày dự kiến giao phải khác khoảng trống!");}
    else if(nttg==""){
        alert_info("Ngày thực tế giao phải khác khoảng trống!");}
    else if(makh==""){
        alert_info("Mã khách hàng phải khác khoảng trống!");}
    else if(manv==""){
        alert_info("Mã nhân viên phải khác khoảng trống!");}
    else{
        var datasend={
            event:"insert",
            maddh:maddh,
            ngayddh:ngayddh,
            trangthaiddh:trangthaiddh,
            ngkg:ngkg,
            nttg:nttg,
            makh:makh,
            manv:manv

        }
        queryDataGET_JSON("php/don_dat_hang.php", datasend, function(res){
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
$(".btn_suadondathang").click(function(){
    var maddh=$(".txtmaddh").val();//lấy giá trị từ ô nhập liệu
    var ngayddh=$(".txtngayddh").val();
    var trangthaiddh=$(".txttrangthaiddh").val();
    var ngkg=$(".txtngaydukiengiao").val();
    var nttg=$(".txtngaythuctegiao").val();
    var makh=$(".txtmakhddh").val();
    var manv=$(".txtmanvddh").val();
    if(maddh==""){
        alert_info("Mã đơn đặt hàng phải khác khoảng trống!");}
    else if(ngayddh==""){
        alert_info("Ngày đặt hàng phải khác khoảng trống!");}
    else if(trangthaiddh==""){
        alert_info("Trạng thái đơn đặt hàng phải khác khoảng trống!");}
    else if(ngkg==""){
        alert_info("Ngày dự kiến giao phải khác khoảng trống!");}
    else if(nttg==""){
        alert_info("Ngày thực tế giao phải khác khoảng trống");}
    else if(makh==""){
        alert_info("Mã khách hàng phải khác khoảng trống!");}
    else if(manv==""){
        alert_info("Mã nhân viên phải khác khoảng trống!");}
    else{
        bootbox.confirm("Bạn có chắc sửa thể loại có maddh: '" + maddh + "' ?",
        function(result){
            if(result==true)//Nếu nhấn ok
            {
                var datasend={
                    event:"update",
                    maddh:maddh,
                    ngayddh:ngayddh,
                    trangthaiddh:trangthaiddh,
                    ngkg:ngkg,
                    nttg:nttg,
                    makh:makh,
                    manv:manv
                }
                queryDataGET_JSON("php/don_dat_hang.php",datasend,function(res){
                    console.log(res);
                    if(res["update"]==1){
                        
                        alert_info("Sửa thành công trang số: " + dondathang_current);
                        builddsdondathang(dondathang_current,recorddondathang);
                        $("txtmath").val("");
                        $("txtngayddh").val("");
                        $("txttrangthaiddh").val("");
                        $("txtngaydukiengiao").val("");
                        $("txtngaythuctegiao").val("");
                        $("txtmakhddh").val("");
                        $("txtmanvddh").val("");
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
$(".btn_lamlaidondathang").click(function(){
    $(".txtmaddh").val("");//THAY giá trị từ ô nhập liệu về mặc định
    $(".txtngayddh").val("");
    $(".txttrangthaiddh").val("");
    $(".txtngaydukiengiao").val("");
    $(".txtngaythuctegiao").val("");
    $(".txtmakhddh").val("");
    $(".txtmanvddh").val("");
});
$(".btn_xoadondathang").click(function(){
    var maddh=$(".txtmaddh").val();//lấy giá trị từ ô nhập liệu

    if(maddh==""){
        alert_info("Mã đơn đặt hàng phải khác khoảng trống!");}
    else {
        bootbox.confirm("Bạn có chắc xóa đơn đặt hàng có maddh: '" + maddh + "'?",
        function(result){
            if(result==true){
                var datasend={
                    event:"delete",
                    maddh:maddh
                }
                queryDataGET_JSON("php/don_dat_hang.php",datasend,function(res){
                    console.log(res);
                    if(res["delete"]==1){
                        alert_info("Xóa thành công!");
                        builddsdondathang(dondathang_current,recorddondathang);
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


function builddsdondathang(page,record) {
   
    var dataSend={
		event:"getDSDonDatHang",
		page:page,
        record:record
    }
    
    $(".listdsdondathang").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/don_dat_hang.php",dataSend,function (res) {
            $(".listdsdondathang").html("");
            buildHTMLDonDatHangData(res);
            //alert_info("Đã lấy được dữ liệu " + res);
    });
}
//Hiển thị dữ liệu lấy JSON từ server
function buildHTMLDonDatHangData(res) {
    if(res.total==0){
         $(".listdsdondathang").html("Chưa có nội dung");
         
    }else{  
    var data = res.items;

    resalldondathang=data;
    var stt=1;
    var currentpage=parseInt(res.page);
    stt=printSTT(recorddondathang,currentpage);
    var html='';
    var vt=0;
    for (item in data) {
        var list=data[item];
    
        html=html +
            '<tr data-maddh="' + list.maddh + '" data-name="'+list.maddh+'" data-vt="' + list.maddh + '">' +
            '<td>' + stt + '</td>' +
            '<td>' + list.maddh+'</td>'+
            '<td>' + list.ngayddh+'</td>'+
            '<td>' + list.trangthaiddh+'</td>'+
            '<td>' + list.ndkg+'</td>'+
            '<td>' + list.nttg+'</td>'+
            '<td>' + list.makh+'</td>'+
            '<td>' + list.manv+'</td>'+
            '<td class="click_sua_don_dat_hang"><i class="fa fa-eye"></i></td>' +
            '<td>' + 
                '<span class="label label-warning label-mini btn_xulydh">Xử lý đơn hàng</span>' + 
            '</td>' + 
            '</tr>';
        stt++;

        $(".listdsdondathang").html(html)
    }
    buildSlidePage($(".pagenumberdondathang"),5,res.page,res.totalpage);
    }
 }
 var dondathang_current=0;
 $(".pagenumberdondathang").on('click','button',function () {
     
     dondathang_current=$(this).val();
     builddsdondathang($(this).val(),recorddondathang);
     
 });

$(".listdsdondathang").on('click','.click_sua_don_dat_hang',function () {
    var maddh=($(this).parents("tr").attr("data-maddh"));
    $(".txtmaddh").val(resalldondathang[maddh].maddh);
    $(".txtngayddh").val(resalldondathang[maddh].ngayddh);
    $(".txttrangthaiddh").val(resalldondathang[maddh].trangthaiddh);
    $(".txtngaydukiengiao").val(resalldondathang[maddh].ndkg);
    $(".txtngaythuctegiao").val(resalldondathang[maddh].nttg);
    $(".txtmakhddh").val(resalldondathang[maddh].makh);
    $(".txtmanvddh").val(resalldondathang[maddh].manv);
});

//sự kiện click button xử lý và button xóa đơn hàng
$(".listallddh").on('click',".btn_xulydh",function(){
    console.log("click button xử lý đơn hàng");
    //gọi hàm swapmain
    $(".showxulydh").modal("show");
});

$(".listallddh").on('click',".btn_xoadh",function(){
    //gọi hàm swapmain
    bootbox.confirm("Bạn có chắc xóa đơn hàng", function(result){
        if(result==true)//Nếu nhấn ok
        {
            console.log("Bạn đã chọn ok!");
        }
        else//Nếu nhấn cancel
        {}
    })
});