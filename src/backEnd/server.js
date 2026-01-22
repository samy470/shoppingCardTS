import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Game from "./models/games.js";

const app = express();
app.use(cors());
app.use(express.json());

await mongoose.connect("mongodb://localhost:27017/games");

console.log("MongoDB connected");

// API route
app.get("/api/games", async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

import { pool } from "./db.js";

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  await pool.query(
    "INSERT INTO users(username, password) VALUES($1,$2)",
    [username, password]
  );
  res.json({ ok: true });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query(
    "SELECT * FROM users WHERE username=$1 AND password=$2",
    [username, password]
  );
  res.json(result.rows[0] || null);
});


app.listen(5000, () => console.log("Backend running on port 5000"));