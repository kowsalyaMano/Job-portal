import express from "express";
import cors from "cors";
import referralRouter from "./routes/refrralRouter.js";
import jobRouter from "./routes/jobRouter.js"
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT = 4030;
app.use("/api", jobRouter);
app.use("/api", referralRouter);
app.listen(PORT, () => {
  console.log(`server is running on the ${PORT}`);
});
