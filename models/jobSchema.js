import mongoose from "mongoose";
const Schema = mongoose.Schema;
 
const CurrentOpening = new Schema({
    job_code: {
        type: String,
        required: true,
        unique:true
    },
    job_title: {
        type: String,
        required: true
    },
    job_description: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    skill_set: {
        type: [String],
        required: true
    },
    job_location: {
        type: String,
        required: true
    },
    expire_date: {
        type: Date,
        required: true
    }
});
 
const employeeReferralSchema = new Schema({
    user_id:String,
    referral:{
        type:[{
            job_code:String,
            job_description:String,
            email:String,
            phone:Number
        }
        ],defaut:[]
    }
});
 
const CurrentOpenings = mongoose.model("currentopening", CurrentOpening);
const EmployeeReferral = mongoose.model("employeereferral", employeeReferralSchema);
 
export { CurrentOpenings, EmployeeReferral };