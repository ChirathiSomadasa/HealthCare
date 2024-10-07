// var mongoose = require("mongoose");
// var Schema = mongoose.Schema;
// const objectId = Schema.ObjectId;

// var userSchema = new Schema(
//     {
//         id: objectId,
//         full_name:{type:String, required:true},
//         mobile_number:{type:String, required:true},
//         address:{type:String, required:true},
//         email:{type:String,required:true},
//         birthdate:{type:String,required:true},
//         password:{type:String,required:true},
//         profile_pic:{type:String}
//     }
// );
 
// var user = mongoose.model("user", userSchema);
// module.exports = user;

const mongoose = require("mongoose");
const USER_ROLES = require("../constants/roles");

const userSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    mobile_number: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.PATIENT,
    },
    profilePic: { type: String },
    birthdate: { type: String, required: true },
    digitalCard: { type: Boolean, default: false },
    physicalCard: { type: Boolean, default: false },
    showQR: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
