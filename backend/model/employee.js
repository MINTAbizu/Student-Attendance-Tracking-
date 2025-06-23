import mongoose from "mongoose";



const employeeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    employeeid: {
        type: String,
        required: true,
        unique: true,
      

    },
    
  name: {
    type: String,
    required: true,
  },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
     
        default: 'employee',
    },
    image:{
        type: String,


    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    dateOfJoining: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
  timestamps: true,
    versionKey: false,
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;