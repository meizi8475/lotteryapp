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
    app.post('/checkMember',setting.checkMember);
    app.post('/findMembers',setting.findMembers);
    app.post('/updateMember',setting.updateMember);
    app.post('/deleteMember',setting.deleteMember);

    app.post('/findPrize',setting.findPrize);
    app.post('/savePrize',setting.savePrize);
    app.post('/deletePrize',setting.deletePrize);
    app.post('/updatePrize',setting.savePrize);
    app.post('/checkPrize',setting.checkPrize);
}