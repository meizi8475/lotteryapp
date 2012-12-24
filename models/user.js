function create(){
var mongoose = require('mongoose')
	, Schema = mongoose.Schema;
	
var UserSchema = new Schema({
	userName: { type: String, index: true, required: true},
	password: { type:String, required:true},
	company:{type: String, required: true},
	created: { type: Date, required: true, default: Date.now()},
	state:{type:Number,default:0},
	loginTimes:{type:Number,default:0}
});

return mongoose.model('User', UserSchema);
}

exports.User = create;
