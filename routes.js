/**
 * routes.js 配置路由
 */
var site = require('./controllers/site'),
    sign = require('./controllers/sign'),
    setting = require("./controllers/setting")

module.exports = function (app) {
    app.get('/', site.index);

    app.get('/redicetSign', site.redicetSign);

    app.post('/signup', sign.signup);

    app.post('/login', sign.login);

    app.get("/accountsetting", setting.accountSetting);
    app.get("/adminInfo", setting.getAdminInfo);
    app.post("/adminInfo", setting.changeAdminInfo);
}