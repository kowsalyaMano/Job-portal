import {CurrentOpenings} from "../models/jobSchema.js";
export const currentopenings = async (req, res) => {
    try {
        const openings = await CurrentOpenings.find().sort({_id:-1});
        res.status(200).json({ message: "Successfully fetched current openings", data: openings });
    } catch (error) {
        console.error("Failed to fetch Current Opening Data",error)
        res.status(500).json({ message: error.message });
    }
}
export const jobopenings = async (req, res) => {
    const {
        job_code,
        job_title,
        job_description,
        experience,
        skill_set,
        job_location,
        expire_date
    } = req.body;
    
    try {
        const newOpening = new CurrentOpenings({
            job_code,
            job_title,
            job_description,
            experience,
            skill_set,
            job_location,
            expire_date
        });
        const savedOpening = await newOpening.save();
        res.status(201).json({message:"Sucessfully inserted job details", data:savedOpening});
    } catch (error) {
        console.error("Inserteing job details failed:", error);
        res.status(400).json({ message: error.message });
    }
}
export const jobDescriptionFind = async (req, res) => {
    
    try {
        const jobCodeName = req.params.jobCodeName;
        const referrals = await CurrentOpenings.find({ "job_code": jobCodeName });
        if (referrals.length === 0) {
            return res.status(404).json({ message: "No referrals found for the given job code" });
        }
        const description = referrals[0].job_description;
        res.status(201).json({message:"Job Description Fetched sucessfully", data: description });
    } catch (error) {
        console.error("Error finding job description:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
  