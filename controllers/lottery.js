/**
 * Created with JetBrains WebStorm.
 * User: wangyuxin
 * Date: 12-12-21
 * Time: 下午5:09
 * 实现抽奖的业务
 */
var LotteryDeal = require('../models/lottery');
var LotteryNow=LotteryDeal.LotteryNow();
var LotteryMemberHistory=LotteryDeal.LotteryMemberHistory();

exports.doLottery=function(req, res, next){
    var _user=req.session.user;

}