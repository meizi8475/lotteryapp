/**
 * site.js 负责大模块跳转
 */
exports.index=function(req, res){
	res.render('index',{
		layout: 'layout',									
		base: '/',
		user : req.session.user,
		success : req.flash('success').toString(),
		error : req.flash('error').toString()
	});
}