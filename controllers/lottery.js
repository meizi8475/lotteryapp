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

function zhaoLottery(username,clients){
    this.username=username;
    this.clients=clients;
}

zhaoLottery.prototype.findLotteryMembers=function(){
    var _clients=this.clients;
    LotteryNow.findOne({userName:'meizi8475@126.com'},function(err,lotteryNow){
        var _sendMessage={
            awardLevelName: lotteryNow.awardLevelName,
            awardPic: lotteryNow.awardPic,
            members:[]
        };
        MemberL.find({userName:'meizi8475@126.com',state:0},'memberNo',function(err,memberl){
            if(err){
                console.log(err);
            }else{
                var _arr=[];
                for(var i=0;i<memberl.length;i++){
                    _arr.push(memberl[i]._doc.memberNo);
                }
                _arr.sort(randomsort);
                _sendMessage.members=_arr;
                for(var i=0;i<_clients.length;i++){
                    _clients[i].sendUTF(JSON.stringify(_sendMessage));
                }
            }
        });
    });
}

zhaoLottery.prototype.dealLotteryMembers=function(){
    var _this=this;
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
        MemberL.find({userName:"meizi8475@126.com",state:0},function(err,_memberl){
            var _arr=[];
            for(var i=0;i<_memberl.length;i++){
                _arr.push(_memberl[i]._doc.memberNo);
            }
            _arr.sort(randomsort);
            var _arr2=[];
            for(var j=0;j<overMembers;j++){
                _arr2.push(_arr[j]);
                MemberL.update({userName:_this.username,memberNo:_arr[j]},{$set:{state:1}},function(err,count){
                    if(err) console.log(err);
                });
            }
            var _clients=_this.clients;
            for(var k=0;k<_clients.length;k++){
                _clients[k].sendUTF(JSON.stringify(_arr2));
            }
        });
    });
}

zhaoLottery.prototype.dealLotterySettingNow=function(prize){
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
        if(!err){
            mythis.findLotteryMembers();
        }
    });
}

exports.startLottery=function(user,clients){
    var myLottery=new zhaoLottery(user,clients);
    LotteryNow.findOne({userName:user},function(err,lotteryNow){
         if(!lotteryNow){
             PrizeL.find({userName:user,state:0}).sort({order:1}).limit(1).exec(function(err,prize){
                 if(prize.length>0){
                     myLottery.dealLotterySettingNow(prize[0]._doc);
                 }else{
                     for(var i=0;i<clients.length;i++){
                         clients[i].sendUTF("抽奖结束");
                     }
                 }
             });
         }else{
             if(lotteryNow.lotteryNowTime==lotteryNow.lotteryTimes){
                 PrizeL.findOneAndUpdate({userName:user,state:0},{$set:{state:1}}).sort({order:1}).limit(1).exec(function(err,prize){
                     PrizeL.find({userName:user,state:0}).sort({order:1}).limit(1).exec(function(err,prize){
                         if(prize.length>0){
                             LotteryNow.remove({userName:user}).exec(function(err){
                                 if(!err){
                                     myLottery.dealLotterySettingNow(prize[0]._doc);
                                 }
                             });
                         }else{
                             for(var i=0;i<clients.length;i++){
                                 clients[i].sendUTF("抽奖结束");
                             }
                         }
                     });
                 })
             }else{
                 LotteryNow.update({userName:user},{$inc:{lotteryNowTime:1}},function(err,lotteryNow){
                        myLottery.findLotteryMembers();
                 });
             }
         }
    });
}

exports.stopLottery=function(user,clients){
    var myLottery=new zhaoLottery(user,clients);
    myLottery.dealLotteryMembers();
}
