import express from "express";
import dotenv from "dotenv";
import configRoutes from "./routes/index.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import { createClient } from "redis";
// import asyncRedis from "async-redis";
// const client = asyncRedis.createClient(process.env.REDISTOGO_URL);

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
// app.use(express.static(path.join(__dirname,"front-end","dist")));

app.get("/", async (req, res) => {
  // console.log((path.join(__dirname, '../front-end/dist')))
  res.json("Hello World! 123");
});

app.use("/", async (req, res, next) => {
  next();
});

// routes for admin upcoming event
app.use("/admin/upcomingevent", async (req, res, next) => {
  next();
});

// routes for admin about
app.use("/admin/about", async (req, res, next) => {
  next();
});

// routes for admin photos
app.use("/admin/photos", async (req, res, next) => {
  next();
});

configRoutes(app);

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});
