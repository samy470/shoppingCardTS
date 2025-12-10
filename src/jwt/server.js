import express from "express";
import cors from "cors";
import auth from "./auth.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", auth);

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
