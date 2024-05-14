import { EmployeeReferral } from "../models/jobSchema.js";
import { CurrentOpenings } from "../models/jobSchema.js";
import { sendPasswordResetEmail} from "../middleware/emailSender.js"
import mongoose from "mongoose"; 
 
 export const referalData=async (req, res) => {
    try {
        const referrals = await EmployeeReferral.find({});
        res.status(200).json({message:"Referral Data fetched Successfully",data:referrals});
    } catch (err) {
        console.error("JReferral Datas Fetching Failed",err);
        res.status(500).json({ message: err.message });
    }
};
export const viewJobs=async(req,res)=>{
    try{
        const jobroles=await CurrentOpenings.find({})
        const jobCodes = jobroles.map(job => job.job_code);
        res.status(200).json({message:"Job Code datas Fetched Succesfully",data:jobCodes});
 
    }catch (err) {
        console.error("Job Code Datas Fetching Failed",err);
        res.status(400).json({ message: err.message });
    }
}
 
export const insertData = async (req, res) => {
const{user_id,user_first_name}=req.user;
    const { referral } = req.body;
    const { job_code, job_description, email, phone } = referral[0];
    const name = email.split("@")[0];
    if (!req.body.user_id) {
        return res.status(400).json({ message: "user_id is required" });
    }
   
 const user = await mongoose.connection.db.collection("employeemanagements").findOne({  user_id: req.body._id  });
    try {
       if (!user){
            return res.status(404).json({ message: "User not found" });
        }
    
        const newReferral = new EmployeeReferral({
            user_id: user_id,
            referral: [{
                job_code: job_code,
                job_description: job_description,
                email: email,
                phone: phone
            }]
        });
        
        const savedReferral = await newReferral.save();

        const data={
            user_name: name,
            email: email,
            employee:user_first_name,
            description:job_description
        }
       await sendPasswordResetEmail(
            email,
            process.env.EMAIL_USERNAME,
            req.user.official_email_id,
            "Job Referral - reg;",
            "job-temp",
            data
        )
        res.status(201).json({ message:"Mail Send Success",Referral: savedReferral });
    } catch (err) {
        console.error("Error saving referral:", err);
        res.status(500).json({ message: err.message });
    }
};
 