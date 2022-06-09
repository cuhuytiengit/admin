//(thể loại Lavie)click thêm - lưu - làm lại
$(".btn_themtheloai").click(function(){
    var matl=$(".txtmatl").val();//lấy giá trị từ ô nhập liệu
    var tentl=$(".txttentl").val();
    if(matl==""){
        alert_info("Mã thể loại khác khoảng trống!");}
    else if(tentl==""){
        alert_info("Tên thể loại khác khoảng trống!");}
    else{
        var datasend={
            event:"insert",
            matl:matl,
            tentl:tentl
        }
        queryDataGET_JSON("php/the_loai.php", datasend, function(res){
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
$(".btn_suatheloai").click(function(){
    var matl=$(".txtmatl").val();//lấy giá trị từ ô nhập liệu
    var tentl=$(".txttentl").val();
    if(matl==""){
        alert_info("Mã thể loại phải khác khoảng trống!");}
    else if(tentl==""){
        alert_info("Tên thể loại phải khác khoảng trống!");}
    else{
        bootbox.confirm("Bạn có chắc sửa thể loại có matl: '" + matl + "' ?",
        function(result){
            if(result==true)//Nếu nhấn ok
            {
                var datasend={
                    event:"update",
                    matl:matl,
                    tentl:tentl
                }
                queryDataGET_JSON("php/the_loai.php",datasend,function(res){
                    console.log(res);
                    if(res["update"]==1){
                        
                        alert_info("Sửa thành công trang số: " + theloai_current);
                        builddstheloai(theloai_current,recordtheloai);
                        $("txtmatl").val("");
                        $("txttentl").val("");
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
$(".btn_lamlaitheloai").click(function(){
    $(".txtmatl").val("");//THAY giá trị từ ô nhập liệu về mặc định
    $(".txttentl").val("");
});
$(".btn_xoatheloai").click(function(){
    var matl=$(".txtmatl").val();
    if(matl==""){
        alert_info("Mã thể loại phải khác khoảng trống!");}
    else{
        bootbox.confirm("Bạn có chắc xóa thể loại có matl: '" + matl + "' ?",
        function(result){
            if(result==true)
            {
                var datasend={
                    event:"delete",
                    matl:matl
                }
                queryDataGET_JSON("php/the_loai.php",datasend,function(res){
                    console.log(res);
                    if(res["delete"]==1){
                        alert_info("Xoa thanh cong trang so: " + theloai_current);
                        builddstheloai(theloai_current,recordtheloai);
                        $("txtmatl").val("");
                        $("txttentl").val("");
                    }

                    else{
                        alert_error("Xoa khong thanh cong");}
                });
            }
        });
    } 
});

//Hiển thị dữ liệu the_loai lấy JSON từ server
function builddstheloai(page,record) {
   
    var dataSend={
		event:"getDSTheLoai",
		page:page,
        record:record
    }
    
    $(".listdstheloai").html("<img src='images/loading.gif' width='30px' height='30px'/>");
    queryDataGET_JSON("php/the_loai.php",dataSend,function (res) {
            $(".listdstheloai").html("");
            buildHTMLTheLoaiData(res);
            //alert_info("Đã lấy được dữ liệu " + res);
    });
}

var resalltheloai;
function buildHTMLTheLoaiData(res) {
    if(res.total==0){
         $(".listdstheloai").html("Chưa có nội dung");
         
    }else{
     var data = res.items;
    
     resalltheloai=data;
     var stt=1;
    var currentpage=parseInt(res.page);
     stt=printSTT(recordtheloai,currentpage);
     var html='';
     var vt=0;
     for (item in data) {
         var list=data[item];
       
         html=html +
             '<tr data-matl="' + list.matl + '" data-name="'+list.matl+'" data-vt="' + list.matl + '">' +
             '<td>' + stt + '</td>' +
             '<td>' + list.matl+'</td>'+
             '<td>' + list.tentl+'</td>'+
             '<td class="click_sua_the_loai"><i class="fa fa-eye"></i></td>'+
             '</tr>';
         stt++;
 
         $(".listdstheloai").html(html)
     }
     buildSlidePage($(".pagenumbertheloai"),5,res.page,res.totalpage);
    }
 }
 var theloai_current=0;
 $(".pagenumbertheloai").on('click','button',function () {
     
     theloai_current=$(this).val();
     builddstheloai($(this).val(),recordtheloai);
     
 });
 $(".listdstheloai").on('click',".click_sua_the_loai",function () {
    var matl=($(this).parents("tr").attr("data-matl"));
    $(".txtmatl").val(resalltheloai[matl].matl);
    $(".txttentl").val(resalltheloai[matl].tentl);
    });
    
    showAvartar();
    function showAvartar()
    {
        //get lay du lieu tu bien trong trinh duyet
        var username=localStorage.getItem("UserBS");
        var pass=localStorage.getItem("passBS");
        var av=localStorage.getItem("avartar");
        if(username==""||username==undefined||username==null){
            location.href='login.html';
        }else{
            $(".myusername").html(username);
            $(".myavartar").attr("src","file/"+av);
        }
    }
function logout(){
    localStorage.removeItem("UserBS");
    localStorage.removeItem("passBS");
    localStorage.removeItem("avartar");
    location.href='login.html';
}
$(".btn_logout").click(function(){
    logout();
});

//change avartar
$(".btn_change_avartar").click(function () {
		
	$("#imgSP").val("")
	
	$('.showmodal_changeavartar').modal('show');
	initUploadImage("imgSP","imgSPPreview","onSuccessUploadImageavartar");
});
var urlimage="";
function onSuccessUploadImageavartar(oj){
 console.log(oj);
$("#imgSPPreview").removeClass("is-hidden");
$("#imgSPPreview").attr("src",oj.url);
 console.log(oj.attach);
urlimage=oj.attach;
}
//hàm đổi avatar trên csdl
$(".btn_update_avartar").click(function () {
var username=localStorage.getItem("userBS");

	if(urlimage==""){
		alert_info("Chưa chọn hình");
	}else{
		var datasend = {
					event: "UpdateAvatar",
					
					username:username,
					avartar:urlimage
				};
				console.log(datasend);
				queryDataGET_JSON("php/the_loai.php",datasend, function (data) {
								 
					if(data["UpdateAvatar"]==1){
						alert_info("Update thành công !!");
						//$(".avartarimage").attr("src",urllocal+"file/"+urlimage);
						
						localStorage.removeItem("avartar"); //xóa avartar localstorge 
						localStorage.setItem("avartar",urlimage); //lưu lại avartar localstorge
						showAvartar();
						urlimage=""
					}else{
						alert_info("Thất bại !!");
					}
				});
	
	}
});
