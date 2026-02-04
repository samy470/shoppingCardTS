import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Game from "./models/games.js";
import User from './models/User.js';
import client from "prom-client";

const app = express();
app.use(cors());
app.use(express.json());

await mongoose.connect("mongodb://localhost:27017/games");

console.log("MongoDB connected");

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const mongooseQueryDuration = new client.Histogram({
  name: 'mongoose_query_duration_ms',
  help: 'Mongoose query duration in milliseconds',
  labelNames: ['collection', 'operation'],
  buckets: [1, 5, 10, 50, 100, 500, 1000]
});

const originalExec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.exec = function() {
  const start = Date.now();
  const result = originalExec.apply(this, arguments);
  
  if (result && result.then) {
    return result.finally(() => {
      const duration = Date.now() - start;
      const collection = this.model?.modelName || 'unknown';
      const operation = this.op || 'unknown';
      mongooseQueryDuration.labels(collection, operation).observe(duration);
    });
  }
  return result;
};

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'HTTP request duration in milliseconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [10, 50, 100, 200, 500, 1000, 2000, 5000]
});

app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const route = req.route?.path || req.path;
    httpRequestDuration
      .labels(req.method, route, res.statusCode.toString())
      .observe(duration);
  });
  
  next();
});

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

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (error) {
    res.status(500).end(error.message);
  }
});


app.listen(5000, () => console.log("Backend running on port 5000"));