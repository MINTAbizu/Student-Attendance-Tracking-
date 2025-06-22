// import mongoose from "mongoose";

import mongoose from "mongoose";

const departmentschema= new  mongoose.Schema({
    dep_name:{
        type:String,
        required:true,
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    dep_description:{
        type:String,
        required:true,
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
})

const departmentmodel= mongoose.model("department",departmentschema);
export default departmentmodel;