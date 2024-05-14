import express from "express";

import { validateToken } from "../middleware/verifyTokens.js";
import { currentopenings, jobDescriptionFind, jobopenings } from "../controllers/currentOpenning.js";
const router = express.Router();
router.get("/currentopenings", validateToken, currentopenings);
router.post("/currentopenings", validateToken, jobopenings);
router.post("/jobCode/:jobCodeName", validateToken, jobDescriptionFind);

export default router;
