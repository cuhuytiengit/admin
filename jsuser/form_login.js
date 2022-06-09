//(thể loại)click thêm - lưu - làm lại
$(".btn_login").click(function(){
    var username=$(".txtuser").val();//lấy giá trị từ ô nhập liệu
    var password=$(".txtpass").val();
    if(username==""){
        alert_info("Username khác khoảng trống!");}
    else if(password==""){
        alert_info("Pass khác khoảng trống!");}
    else{
        var datasend={
            event:"login",
            username:username,
            password:password
        }
        queryDataGET_JSON("php/login.php",datasend,function(res){
            console.log(res);
            if(res.event==1){
                localStorage.setItem("UserBS",res.items.username);
                localStorage.setItem("passBS",password);
                localStorage.setItem("avartar",res.items.avartar);

                location.href='index.html';
            }
            else{
                alert_error("username hoac mat khau sai!");
            }
        });
    }
});
