import express from "express";
import {referalData,insertData,viewJobs} from "../controllers/referralController.js";
import { validateToken } from "../middleware/verifyTokens.js";
 
const router = express.Router();
 
router.get("/viewreferral",validateToken,referalData )
router.get("/employee-referrals",validateToken,viewJobs );
router.post("/referral",validateToken,insertData);
 
export default router;