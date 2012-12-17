/**
 * routes.js 配置路由
 */
 var site=require('./controllers/site');
//var sign=require('./controllers/sign');

module.exports=function(app){
	app.get('/',site.index);
}