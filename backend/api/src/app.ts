import express from "express";
import mianRouter from "./routes/index";
const app = express();
app.use("/api/v1", mianRouter);

export default app;