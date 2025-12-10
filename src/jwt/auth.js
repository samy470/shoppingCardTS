import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";

const router = express.Router();

// fake DB
const users = [];

fs.readFile('users.json', 'utf8')
  .then(data => {
    const parsedUsers = JSON.parse(data);
    users.push(...parsedUsers);
  });

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    users.push({ username, password: hashed });

    await fs.writeFile('users.json', JSON.stringify(users, null, 2));

    res.json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: "Wrong credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: "Wrong credentials" });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token, username });
});

export default router;
