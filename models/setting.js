/**
 * setting.js 其他模型
 */
 function memberCreate(){
 	var mongoose = require('mongoose')
	, Schema = mongoose.Schema;
	
	var MemberSchema = new Schema({
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
	
	return mongoose.model('Member', MemberSchema);	
}

exports.Member=memberCreate;

function prizeCreate(){
	var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

    var awardPicture=new Schema({
        awardName:{type:String,required:true},
        imageUrl:{type:String}
    });

	var PrizeSchema = new Schema({
		userName: { type:String, required:true},
        awardLevelName:{type: String},
        awardPic:[awardPicture],
        order:{type:Number,required:true},
        message:{type:String,default:'恭喜中奖'},
        lotteryMembersNum:{type:Number,required:true},
        lotteryTimes:{type:Number,required:true},
        lotteryTimeMemberNum:{type:Number,required:true},
        speed:{type:Number,default:2000},
        created:{type: Date, required: true, default: Date.now()}
	});
	
	return mongoose.model('Prize', PrizeSchema);	
}

exports.Prize=prizeCreate;

