//Javascript Document
//alert("hello")
//bắt sự kiện click
//viết hàm trong javascript
//main: form_theloai,
var recordtheloai=10;
var recordthuonghieu=10;
var recordsanpham=10;
var recordkhachhang=10;
var recordnhanvien=10;
var recordnhacungcap=10;
var recordnccth=10;
var recordthsp=10;
var recordtlsp=10;
var recorddondathang=10;
function swapmain (main) {
    $(".form_ttthuonghieu").addClass("is-hidden");
    $(".form_tttl").addClass("is-hidden");
    $(".form_ttsp").addClass("is-hidden");
    $(".form_ttkhachhang").addClass("is-hidden");
    $(".form_ttnhanvien").addClass("is-hidden");
    $(".form_ttnhacungcap").addClass("is-hidden");
    $(".form_ncc_th").addClass("is-hidden");
    $(".form_th_sp").addClass("is-hidden");
    $(".form_tl_sp").addClass("is-hidden");
    $(".form_khac").addClass("is-hidden");//chưa thiết kế
    $(".form_thongtindonhang").addClass("is-hidden");
    $(".form_chitietdonhang").addClass("is-hidden");
    $(".form_trangchu").addClass("is-hidden");
    $("."+main).removeClass("is-hidden");//+main: nối chuỗi tên của main(tên form nhập ở trong () khi gọi swapmain()
    var html='<li><a href="#">'+
    '<i class="fa fa-home"></i>'+
    'Trang chủ</a></li>'+
    '<li class="active">Thể loại</li>';
    $(".titlebreadcrumb").html(html);
}
$(".menu_thuonghieu").click(function(){
    console.log("click menu thương hiệu");
    swapmain("form_ttthuonghieu");
    var html='<li><a href="#">'+
    '<i class="fa fa-home"></i>'+
    'Trang chủ</a></li>'+
    '<li class="active">Thể loại</li>';
    $(".titlebreadcrumb").html(html);
    builddsthuonghieu(0,recordthuonghieu);
});
$(".menu_theloai").click(function(){
    console.log("click menu thể loại")
    swapmain("form_tttl");
    var html='<li><a href="#">'+
    '<i class="fa fa-home"></i>'+
    'Trang chủ</a></li>'+
    '<li class="active">Thể loại</li>';
    $(".titlebreadcrumb").html(html);
    builddstheloai(0,recordtheloai);
});
$(".menu_sanpham").click(function(){
    console.log("click menu sản phẩm")
    swapmain("form_ttsp");
    var html='<li><a href="#">'+
    '<i class="fa fa-home"></i>'+
    'Trang chủ</a></li>'+
    '<li class="active">Thể loại</li>';
    $(".titlebreadcrumb").html(html);
    builddssanpham(0,recordsanpham);
});
$(".menu_khachhang").click(function(){
    console.log("click menu khách hàng")
    swapmain("form_ttkhachhang")
    var html='<li><a href="#">'+
    '<i class="fa fa-home"></i>'+
    'Trang chủ</a></li>'+
    '<li class="active">Thể loại</li>';
    $(".titlebreadcrumb").html(html);
    builddskhachhang(0,recordkhachhang);
});
$(".menu_nhanvien").click(function(){
    console.log("click menu nhân viên")
    swapmain("form_ttnhanvien")
    var html='<li><a href="#">'+
    '<i class="fa fa-home"></i>'+
    'Trang chủ</a></li>'+
    '<li class="active">Thể loại</li>';
    $(".titlebreadcrumb").html(html);
    builddsnhanvien(0,recordnhanvien);
});
$(".menu_nhacungcap").click(function(){
    console.log("click menu nhà cung cấp");
    swapmain("form_ttnhacungcap");
    var html='<li><a href="#">'+
    '<i class="fa fa-home"></i>'+
    'Trang chủ</a></li>'+
    '<li class="active">Thể loại</li>';
    $(".titlebreadcrumb").html(html);
    builddsnhacungcap(0,recordnhacungcap);
});
$(".menu_ncc_th").click(function(){
    console.log("click menu nhà cung cấp - thương hiệu")
    swapmain("form_ncc_th");
    var html='<li><a href="#">'+
    '<i class="fa fa-home"></i>'+
    'Trang chủ</a></li>'+
    '<li class="active">Thể loại</li>';
    $(".titlebreadcrumb").html(html);
    builddsnccth(0,recordnccth);
});
$(".menu_th_sp").click(function(){
    console.log("click menu thương hiệu - sản phẩm")
    swapmain("form_th_sp");
    var html='<li><a href="#">'+
    '<i class="fa fa-home"></i>'+
    'Trang chủ</a></li>'+
    '<li class="active">Thể loại</li>';
    $(".titlebreadcrumb").html(html);
    builddsthsp(0,recordthsp);
});
$(".menu_tl_sp").click(function(){
    console.log("click menu thể loại - sản phẩm")
    swapmain("form_tl_sp");
    var html='<li><a href="#">'+
    '<i class="fa fa-home"></i>'+
    'Trang chủ</a></li>'+
    '<li class="active">Thể loại</li>';
    $(".titlebreadcrumb").html(html);
    builddstlsp(0,recordtlsp);
});
$(".menu_khac").click(function(){
    console.log("click menu sách");
    swapmain("form_khac");
    var html='<li><a href="#">'+
    '<i class="fa fa-home"></i>'+
    'Trang chủ</a></li>'+
    '<li class="active">Thể loại</li>';
    $(".titlebreadcrumb").html(html);
});
$(".menu_ddh").click(function(){
    console.log("click menu tác giả");
    swapmain("form_thongtindonhang");
    var html='<li><a href="#">'+
    '<i class="fa fa-home"></i>'+
    'Trang chủ</a></li>'+
    '<li class="active">Đơn đặt hàng</li>';
    $(".titlebreadcrumb").html(html);
    builddsdondathang(0,recorddondathang);
});
$(".menu_chitietdh").click(function(){
    console.log("click menu chi tiết đơn hàng");
    swapmain("form_chitietdonhang");
    var html='<li><a href="#">'+
    '<i class="fa fa-home"></i>'+
    'Trang chủ</a></li>'+
    '<li class="active">Thể loại</li>';
    $(".titlebreadcrumb").html(html);
});



//swapmain("form_thongtintheloai");
//swapmain("form_tacgia");






//kiểm tra email
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

//kiểm tra toàn bộ là số
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

// //kiểm tra url hình ảnh
// function isUrl(urlimg) {
//     var url =~ /\A#{URI::regexp}\z/;
//     return url.text(urlimg);
// }

//Hàm được gọi khi thao tac that bai
function alert_error(mes){
    bootbox.alert({
        size: "small",
        title: "<span style = 'color: red'>Thất bại</span>",
        message: mes,
        callback: function(){/* your callback code */}
    });
}
//Ham duoc goi khi thao tac thanh cong
function alert_success(mes, callback){
    bootbox.alert({
        size: "small",
        title: "Thành công",
        message: mes,
        callback: callback
    });
}
//Ham duoc goi khi thao tac nhac nho user
function alert_info(mes){
    bootbox.alert({
        size: "small",
        title: "Thông báo",
        message: mes,
        callback: function(){/* your callback code */}
    });
}

function queryDataGET(url, dataSend, callback){
    $.ajax({
        type: 'GET',
        url: url,
        data: dataSend,
        async:true,
        dataType: 'text',
        success:callback
    });
}
function queryDataGET_TEXT(url, dataSend, callback){
    $.ajax({
        type: 'GET',
        url: url,
        data: dataSend,
        async:true,
        dataType: 'text',
        success:callback
    });
}
function queryDataPOST_TEXT(url, dataSend, callback){
    $.ajax({
        type: 'POST',
        url: url,
        data: dataSend,
        async:true,
        dataType: 'text',
        success:callback
    });
}

function queryDataGET_JSON(url, dataSend, callback){
    $.ajax({
        type: 'GET',
        url: url,
        data: dataSend,
        async: true,
        dataType: 'JSON',
        success: callback
    });
}

//Hàm hiển thị số thứ tự trong table
function printSTT(record,pageCurr){
    if ((pageCurr+1)==1) {
        return 1;
    }else{
        return record*(pageCurr+1)-(record-1);
    }
}

function buildSlidePage(obj,codan,pageActive,totalPage) {
    var html="";
    pageActive=parseInt(pageActive);
    for(i = 1 ; i <=codan; i++) {
        if(pageActive-i<0) break;
        html='<button type="button" class="btn btn-outline btn-default" value="'+(pageActive-i)+'">'+(pageActive-i+1)+'</button>'+html;
    }
    if(pageActive>codan){
        html='<button type="button" class="btn btn-outline btn-default" value="'+(pageActive-i)+'">...</button>'+html;
    }
    html+='<button type="button" class="btn btn-outline btn-default" style="background-color: #5cb85c" value="'+pageActive+'">'+(pageActive+1)+'</button>';
    for(i = 1 ; i <=codan; i++){
        if(pageActive+i>=totalPage) break;
        html=html+'<button  type="button" class="btn btn-outline btn-default" value="'+(pageActive+i)+'">'+(pageActive+i+1)+'</button>';
    }
    if(totalPage-pageActive>codan+1){
        html=html+'<button type="button" value="'+(pageActive+i)+'" class="btn btn-outline btn-default">...</button>';
    }
    obj.html(html);
}

function initUploadImage(idInput,idpreview,nameFuncion){
	'use strict';
	// Initialise resize library
	var resize = new window.resize();
	resize.init();
	// console.log("no");
	// Upload photo
	document.querySelector('#'+idInput).addEventListener('change', function (event) {
		event.preventDefault();

		// var input=$("#"+idInput);
		$("#"+idInput).change(function ()
		{
			// $("#"+idpreview).show();
			if (typeof(FileReader)!="undefined"){
			
				var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.ico|.jpg|.jpeg|.gif|.png)$/;
			
				$($(this)[0].files).each(function () {
					var getfile = $(this);
					if (regex.test(getfile[0].name.toLowerCase())) {
						var reader = new FileReader();
						reader.onload = function (e) {
							$("#imgPreviewStatus").attr("src",e.target.result);
						}
						reader.readAsDataURL(getfile[0]);
						//document.getElementById("savepath").value=getfile[0].name;
						//console.log(getfile[0]);
					}
					else {
						alert(getfile[0].name + " Không phải là file .");
						return false;
					}
				});
			}
			else {
				alert("Browser does not supportFileReader.");
			}
		});
		var files = event.target.files;
		var countFile=files.length;
		for (var i in files) {
			if (typeof files[i] !== 'object') return false;

			(function () {

				var initialSize = files[i].size;

				resize.photo(files[i], 1200, 'file', function (resizedFile) {

					var resizedSize = resizedFile.size;

					upload(resizedFile, function(res){
						console.log(res);
						var s=nameFuncion+"("+res+")";
						eval(s);
					});

					// This is not used in the demo, but an example which returns a data URL so yan can show the user a thumbnail before uploading th image.
					resize.photo(resizedFile, 600, 'dataURL', function (thumbnail) {
						//console.log('Display the thumbnail to the user: ', thumbnail);
					});

				});

			}());

		}

	});
};
var upload = function (photo, callback) {
	
	var formData = new FormData();
    formData.append('photo', photo);
    
    $.ajax({
        url: './spuploadimagestatus/process.php',
        type : 'POST',
        data : formData,
        async: true,
        xhrFields: {
            withCredentials: true
        },
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        success : callback
    });
};