/**
 * config 配置文件
 */
module.exports = function(express, app) {
	var path=require('path');
	var mongoose = require('mongoose');
	var MongoStore = require('connect-mongo')(express);
	var partials = require('express-partials');
	var flash = require('connect-flash');

	var DB_URL = "mongodb://localhost:27017/lotterDB";
	mongoose.connect(DB_URL);

	app.configure(function() {
				app.set('port', process.env.PORT || 3000);
				app.set('views', __dirname + '/views');
				app.set('view engine', 'ejs');
				app.engine('ejs', require('ejs').__express);
				app.use(partials());
				app.use(flash());
				app.use(express.favicon());
				app.use(express.logger('dev'));
				app.use(express.bodyParser());
				app.use(express.methodOverride());
				app.use(express.cookieParser());
				app.use(express.session({
							store : new MongoStore({
										url : DB_URL
									}),
							secret : 'lotterySecret',
							cookie : {
								maxAge : 60000 * 30
							}
						}));
				app.use(app.router);
				app.use(express.static(path.join(__dirname + '/public')));

				app.use(function(req, res, next) {
							res.render('404', {
										title : 404,
										layout : false
									});
				});

			});

	app.configure('development', function() {
				app.use(express.errorHandler({
							dumpExceptions : true,
							showStack : true
						}));
			});

	app.configure('production', function() {
				app.use(express.errorHandler());
				app.use(function(err, req, res, next) {
							console.error(err.stack);
							res.send(500, 'Something broke!');
						});
			});

	app.use(function(req, res, next) {
				res.locals.user = req.session ? req.session.user : '';
				res.locals.keyword = req.session ? req.session.keyword : '';
				res.locals.error = req.session ? req.session.error : '';
				res.locals.success = req.session ? req.session.success : '';
			});
}