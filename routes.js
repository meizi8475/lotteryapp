/**
 * routes.js 配置路由
 */
 var site=require('./controllers/site');
var sign=require('./controllers/sign');
var setting=require('./controllers/setting');

module.exports=function(app){
	app.get('/',site.index);
	app.get('/redicetSign', site.redicetSign);
	
	app.post('/signup', sign.signup);
	app.post('/login',sign.login);
    app.post('/checkout',sign.checkOut);

    app.post('/saveMember',setting.saveMember);
    app.post('/savePrize',setting.savePrize);
}