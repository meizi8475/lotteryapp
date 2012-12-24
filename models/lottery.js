/**
 * Created with JetBrains WebStorm.
 * User: wangyuxin
 * Date: 12-12-21
 * Time: 下午5:09
 * 设置抽奖的模型
 */
function lotteryNowCreate(){
    var mongoose = require('mongoose')
        , Schema = mongoose.Schema;

    var awardPictureNow=new Schema({
        awardName:{type:String,required:true},
        imageUrl:{type:String}
    });

    var lotteryNowSchema = new Schema({
        userName: { type:String, required:true},
        awardLevelName: { type: String},
        awardPic: [awardPictureNow],
        order:{type:Number,required:true},
        message:{type:String,default:'恭喜中奖'},
        lotteryMembersNum:{type:Number,required:true},
        lotteryTimes:{type:Number,required:true},
        lotteryTimeMemberNum:{type:Number,required:true},
        lotteryNowTime:{type:Number,required:true},
        nowOder:{type:Number,required:true},
        created:{type: Date, required: true, default: Date.now()}
    });

    return mongoose.model('LotteryNow', lotteryNowSchema);
}

exports.LotteryNow=lotteryNowCreate;

function lotteryMemberHistoryCreate(){
    var mongoose = require('mongoose')
        , Schema = mongoose.Schema;

    var lotteryMemberHistorySchema = new Schema({
        memberName: { type: String},
        memberNo: { type:String,required:true},
        userName:{type: String, required: true},
        sex:{type:String},
        department:{type:String},
        position:{type:String},
        status:{type:Number,default:0},
        state:{type:Number,default:0},
        created:{type: Date, required: true, default: Date.now()}
    });

    return mongoose.model('LotteryMemberHistory', lotteryMemberHistorySchema);
}

exports.LotteryMemberHistory=lotteryMemberHistoryCreate;