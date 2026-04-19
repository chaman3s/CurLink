import { Router } from "express";
import router from "./user.rotues";
const mianRouter = Router();
mianRouter.get("/", (req, res) => {
  res.send("Route working 🚀");
});
mianRouter.use("/user",router)
export default mianRouter;