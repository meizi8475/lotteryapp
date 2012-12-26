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
var SettingL = require('../models/setting');
var MemberL=SettingL.Member();
var PrizeL=SettingL.Prize();

function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}

function zhaoLottery(username){
    this.username=username;
    this.memberarr=[];
    this.lotterymemberarr=[];

}

zhaoLottery.prototype.findLotteryMembers=function(){
    var _arr=[];
    MemberL.find({userName:'meizi8475@126.com',state:0},'memberNo').exec(function(){
            if(err){
                console.log(err);
            }else{
                for(var i=0;i<memberl.length;i++){
                    _arr.push(memberl[i]._doc.memberNo);
                }
                _arr.sort(randomsort);
                return _arr;
            }
    });
}

zhaoLottery.prototype.dealLotteryMembers=function(){
    this.memberarr=this.findLotteryMembers();
    this.memberarr.sort(randomsort);
    LotteryNow.findOne({userName:'meizi8475@126.com'},function(err,lotteryNow){
        var nums=lotteryNow._doc.lotteryMembersNum;
        var num=lotteryNow._doc.lotteryTimeMemberNum;
        var times=lotteryNow._doc.lotteryTimes;
        var time=lotteryNow._doc.lotteryNowTime;

        var overMembers=0;
        if(time==times){
            overMembers=nums-(time-1)*num;
        }else{
            overMembers=num;
        }
        for(var j=0;j<overMembers;j++){
            this.lotterymemberarr.push(overMembers[j]);
            MemberL.update({userName:this.username,memberNo:overMembers[j]},{$set:{state:1}},function(err,count){
                if(err) console.log(err);
            });
        }
        return this.lotterymemberarr;
    });
}

zhaoLottery.prototype.dealLotterySettingNow=function(prize){
    var _members=[];
    var newLotteryNow=new LotteryNow({
        userName: this.username,
        awardLevelName: prize.awardLevelName,
        awardPic: prize.awardPic,
        order:prize.order,
        message:prize.message,
        lotteryMembersNum:prize.lotteryMembersNum,
        lotteryTimes:prize.lotteryTimes,
        lotteryTimeMemberNum:prize.lotteryTimeMemberNum,
        lotteryNowTime:1,
        nowOder:prize.order
    });
    var mythis=this;
    newLotteryNow.save(function(err,newlotterynow){

    });
    _members=mythis.findLotteryMembers();
    return _members;
}

exports.doLottery=function(user){
//    var _user=req.session.user;
    var _members=[];
    var myLottery=new zhaoLottery(user);
    LotteryNow.findOne({userName:user},function(err,lotteryNow){
         if(!lotteryNow){
             PrizeL.find({userName:user,state:0}).sort({order:1}).limit(1).exec(function(err,prize){
                 _members=myLottery.dealLotterySettingNow(prize[0]._doc);
                 return _members;
             });
         }else{
             if(lotteryNow.lotteryNowTime==lotteryNow.lotteryTimes){
                 PrizeL.findOneAndUpdate({userName:user,state:0},{$set:{state:1}}).sort({order:1}).limit(1).exec(function(err,prize){
                     PrizeL.find({userName:user,state:0}).sort({order:1}).limit(1).exec(function(err,prize){
                         if(!prize){

                         }else{
                             LotteryNow.remove({userName:user},function(){
                                 _members=myLottery.dealLotterySettingNow(prize[0]._doc);
                                 return _members;
                             });
                         }
                     });
                 })
             }else{
                 LotteryNow.update({userName:user},{$inc:{lotteryNowTime:1}},function(err,lotteryNow){
                     _members=myLottery.findLotteryMembers();
                     return _members;
                 });
             }
         }
    });
}


