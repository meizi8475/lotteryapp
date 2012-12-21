var Setting = require('../models/setting');
var Member=Setting.Member();
var Prize=Setting.Prize();

function checkNO(membersJson,user){
    var arr=[];
    for(var i=0;i<membersJson.length;i++){
        var _member=membersJson[i];
        Member.findOne({memberNo:_member.memberno,userName:user.username},function(err,member){
            if(err) return next(err);
            if(member){
                arr.push(_member.memberno);
            }
        });
    }
    return arr;
}

exports.checkMember=function(req, res, next){
    var _user=req.session.user;
    var _memberNo=req.body.memberno;

    Member.findOne({memberNo:_memberNo,userName:_user.username},function(err,member){
        if(member){
            res.send('编号重复');
        }
    });
}

exports.saveMember=function(req, res, next){
    var _user=req.session.user;
    var membersJson=JSON.parse(req.body.members);
    var arr=checkNO(membersJson,_user);
    if(arr.length>0){
        res.send('以下编号重复'+JSON.stringify(arr));
    }else{
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
}

exports.findMembers=function(req, res, next){
    var _user=req.session.user;
    Member.find({userName:_user.userName},function(err,members){
        if(err) return next(err);
        return res.send(JSON.stringify(members));
    });
}

exports.updateMember=function(req, res, next){
    var _member=req.body.memberinfo;
    Member.remove({_id:_member.id},function(err,member){
        if(err) {
            res.send('修改失败');
        }else{
            var newMember=new Member({
                memberName:_member.membername,
                memberNo:_member.memberno,
//            userName:req.session.user.userName,
                userName:'meizi8475@126.com',
                sex:_member.sex,
                department:_member.department,
                position:_member.position
            });
            newMember.save(function(err,member){
                if(err) {
                    req.flash('error', err.message);
                }
            });
        }
    });
}

exports.deleteMember=function(req, res, next){
    var _member=JSON.parse(req.body.membernos);
    for(var i=0;i<_member.length;i++){
        var _memberNo=_member[i].memberno;
        Member.remove({_id:_memberNo.id},function(err,member){
            if(err){
                return res.send(_memberNo+'删除失败');
            }
        });
    }
}

exports.checkPrize=function(req, res, next){
    var _user=req.session.user;
    var _order=req.body.order;
    Prize.findOne({userName:_user.username,order:_order},function(err,prize){
        if(err) return next(err);
        if(prize){
            return res.send('设置顺序重复');
        }
    });
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

exports.findPrize=function(req, res, next){
    var _user=req.session.user;
    Prize.find({userName:_user.userName},function(err,prizes){
        if(err) return next(err);
        return res.send(JSON.stringify(prizes));
    });
}

exports.deletePrize=function(req, res, next){
    var _prize=JSON.parse(req.body.prize);
    for(var i=0;i<_prize.length;i++){
        Prize.remove({_id:__prize[i].id},function(err,prize){
            if(err){
                return res.send(_memberNo+'删除失败');
            }
        });
    }
}

exports.updatePrize=function(){

}