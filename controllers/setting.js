var Setting = require('../models/setting');
var Member=Setting.Member();
var Prize=Setting.Prize();

exports.saveMember=function(req, res, next){
    var membersJson=JSON.parse(req.body.members);
    for(var i=0;i<membersJson.length;i++){
        var member=membersJson[i];
        var newMember=new Member({
            memberName:member.membername,
            memberNo:member.memberno,
//            userName:req.session.user.userName,
            userName:'meizi8475@126.com',
            sex:member.sex,
            department:member.department,
            position:member.position
        });

        newMember.save(function(err,member){
            if(err) {
                req.flash('error', err.message);
                return res.send(newMember.memberNo+'添加失败');
            }
        });
    }
}

exports.savePrize=function(req, res, next){
    var prizeJson=JSON.parse(req.body.prize);
    var pic=[];
    for(var i=0;i<prizeJson.awardpic.length;i++){
        var awardPics=prizeJson.awardpic[i];
        var newawardPic={
            awardName:awardPics.awardname,
            imageUrl:awardPics.imageurl
        };
        pic.push(newawardPic);
    }
    var newPrize=new Prize({
        userName: req.session.user.userName,
        awardLevelName:prizeJson.awardlevelname,
        awardPic:pic,
        order:prizeJson.order,
        message:prizeJson.message,
        lotteryMembersNum:prizeJson.lotterymembersnum,
        lotteryTimes:prizeJson.lotterytimes,
        lotteryTimeMemberNum:prizeJson.lotterytimemembernum,
        speed:prizeJson.speed
    });

    newPrize.save(function(){
        if(err) {
            req.flash('error', err.message);
            return res.send('添加失败');
        }
    });
}