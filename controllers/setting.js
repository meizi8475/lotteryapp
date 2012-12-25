exports.accountSetting = function (req, res) {
    var pageInfo = {
        title : "抽疯网",
        user : req.session.user,
        success : req.flash('success').toString(),
        error : req.flash('error').toString(),
        login : !!req.session.username
    };
    res.render("accountSetting", pageInfo);
};
exports.memberSetting= function(req,res){
    
}
exports.getAdminInfo = function (req, res) {
    res.json({
        email : "yuanjiefeng@gmai.com",
        realName : "袁杰锋",
        company : "赵涌在线",
        nickname : "Jeffy",
        password : "123456"
    });
};
exports.changeAdminInfo = function (req, res) {
    res.json({
        code : "SUCCESS"
    });
}