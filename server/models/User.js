var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

var userSchema = new Schema(
    {
        id: objectId,
        full_name:{type:String, required:true},
        mobile_number:{type:String, required:true},
        address:{type:String, required:true},
        email:{type:String,required:true},
        birthdate:{type:String,required:true},
        password:{type:String,required:true},
        profile_pic:{type:String}
    }
);

var user = mongoose.model("user", userSchema);
module.exports = user;
