/**
 * site.js 负责大模块跳转
 */
exports.index = function (req, res, next) {
    var pageInfo = {
        title : "抽疯网",
        user : req.session.user,
        success : req.flash('success').toString(),
        error : req.flash('error').toString(),
        login: !!req.session.username
    }
    res.render('index', pageInfo)
}

exports.redicetSign = function (req, res, next) {
    res.render('sign', {
        title: "抽疯网",
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
}