import express from "express";
import mianRouter from "./routes/index";
const app = express();
app.use("/api/v1", mianRouter);
app.use(express.json()); 
export default app;