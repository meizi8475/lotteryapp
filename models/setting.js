/**
 * setting.js 其他模型
 */
 function memberCreate(){
 	var mongoose = require('mongoose')
	, Schema = mongoose.Schema;
	
	var MemberSchema = new Schema({
		memberName: { type: String, required: true},
		memberNo: { type:String, required:true},
		email:{type: String, required: true},
		company:{type: String, required: true},
		realName:{type: String},
		created: { type: Date, required: true, default: Date.now()},
		state:{type:Number,default:0},
		loginTimes:{type:Number,default:0}
	});
	
	return mongoose.model('Member', MemberSchema);	
}

exports.Member=memberCreate;

function prizeCreate(){
	var mongoose = require('mongoose')
	, Schema = mongoose.Schema;
	
	var PrizeSchema = new Schema({
		userName: { type: String, index: true, required: true},
		password: { type:String, required:true},
		email:{type: String, required: true},
		company:{type: String, required: true},
		realName:{type: String},
		created: { type: Date, required: true, default: Date.now()},
		state:{type:Number,default:0},
		loginTimes:{type:Number,default:0}
	});
	
	return mongoose.model('Prize', PrizeSchema);	
}

exports.Prize=prizeCreate;

