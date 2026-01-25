import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Game from "./models/games.js";
import User from './models/User.js';

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

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
    
    const user = await User.create({
      username,
      password
    });

  res.json({ ok: true, user: { id: user.id, username: user.username, password: user.password } });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
      where: { username, password }
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

  res.json({ 
      id: user.id, 
      username: user.username 
    });
});


app.listen(5000, () => console.log("Backend running on port 5000"));