import express from "express";
import dotenv from "dotenv";
import configRoutes from "./routes/index.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import { createClient } from "redis";
// import asyncRedis from "async-redis";
// const client = asyncRedis.createClient(process.env.REDISTOGO_URL);

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../front-end/build')));

app.get("/", (req, res) => {
  console.log((path.join(__dirname, '../front-end/build')))
  res.json("Hello World! 123");
});

// routes for upcoming event
app.use("/admin/upcomingevent", async (req, res, next) => {
  next();
});

configRoutes(app);

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});
