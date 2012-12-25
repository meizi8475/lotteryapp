/**
 * sign.js 登录注册模块
 */
var User = require('../models/user').User();
var crypto = require('crypto');

exports.checkUserName=function(req, res, next){
	User.findOne({userName:req.body.username},function(err, user){
		if(err) return next(err);
		if(user){
			req.flash('error','用户名已经被注册');
			res.send('用户名已经被注册');
		}
	});
}

exports.signup = function(req, res, next){
	var md5 = crypto.createHash('md5');
	var _password = md5.update(req.body.password).digest('base64');
	var newuser = new User({
			userName: req.body.username,
			password: _password,
			company:req.body.company
		});

    newuser.save(function(err,user){
					if(err) {
						req.flash('error', err.message);
						return res.redirect('/signup');
					}
					return res.redirect('/');
			});
}

exports.login=function(req, res, next){
	var md5 = crypto.createHash('md5');
	var _password = md5.update(req.body.password).digest('base64');
	User.findOne({userName:req.body.username},function(err,user){
		if(err) return next(err);
			if(!user){
				req.flash('error','用户不存在');
				return res.redirect('/');
			}
			if(user.password !== _password){
				req.flash('error','密码输入有误');
				return res.redirect('/');
			}else{
				req.session.user = user;				
				res.redirect('/');
			}
	});
}
exports.checkOut=function(req, res, next){
	req.session.destroy();
	req.redirect('/');
}
