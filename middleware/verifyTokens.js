import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export const validateToken = async (req, res, next) => {
  console.log(req.headers["authorization"]);
  try {
    if (!req.headers["authorization"]) {
      return res.status(401).json({ message: "Token is required" });
    }
    const res = await axios.post(
      process.env.TOKEN_VERIFY_URL,
      {
        token: req.headers["authorization"]
      }
    );
    req.user = res?.data?.user;
    next();
  } catch (error) {
    console.error("Error validating token:", error?.response?.data);
    res.status(401).json(error?.response?.data);
  }
};