import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
 update:{
    type: String,format: 'YYYY-MM-DD',
    required: true,
 },  
 employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Leave'],
    default: null
  },
  checkInTime: {
    type: Date,
    default: Date.now
  },
  checkOutTime: {
    type: Date
  }
})
const attendancemodule=mongoose.model("attendnce",attendanceSchema)

export default attendancemodule;
