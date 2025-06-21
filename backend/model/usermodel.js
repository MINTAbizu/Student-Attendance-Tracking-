import mongoose from "mongoose";


const userscham=mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    role:{type:String,enm:["student","teacher","admin"],required:true},
    profileimage: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})


const UserModel = mongoose.model("user", userscham);

export default UserModel;