import app from "./app";
import dotenv from "dotenv";
dotenv.config();

app.listen(5000, () => {
  console.log("Server running on 5000");
});