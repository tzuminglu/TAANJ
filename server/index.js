import express from "express";
import dotenv from "dotenv";
import configRoutes from "./routes/index.js";
import cors from "cors";
// import { createClient } from "redis";
// import asyncRedis from "async-redis";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// local address
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   })
// );

// online deployed
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", async (req, res) => {
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

// routes for admin members
app.use("/admin/members", async (req, res, next) => {
  next();
});

// routes for admin pastevent
app.use("/admin/pastevent", async (req, res, next) => {
  next();
});

configRoutes(app);

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});
