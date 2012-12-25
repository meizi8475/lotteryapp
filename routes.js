/**
 * routes.js 配置路由
 */

var site = require('./controllers/site'),
    sign = require('./controllers/sign'),
    setting = require("./controllers/setting")
module.exports = function (app) {
    app.post('/checkout', sign.checkOut);
    app.post('/saveMember', setting.saveMember);
    app.post('/checkMember', setting.checkMember);
    app.post('/findMembers', setting.findMembers);
    app.post('/updateMember', setting.updateMember);
    app.post('/deleteMember', setting.deleteMember);

    app.post('/findPrize', setting.findPrize);
    app.post('/savePrize', setting.savePrize);
    app.post('/deletePrize', setting.deletePrize);
    app.post('/updatePrize', setting.savePrize);
    app.post('/checkPrize', setting.checkPrize);
}