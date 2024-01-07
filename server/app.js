import express from "express";
const app = express();
import configRoutes from "./routes/index.js";
import cors from "cors";
import { createClient } from "redis";

const client = createClient();
client.connect().then(() => {});

app.use(express.json());
app.use(cors());

// routes for upcoming event
app.use("/admin/upcomingevent", async (req, res, next) => {
  next()
});


configRoutes(app);

app.listen(3000, () => {
  console.log("Your routes will be running on port 3000");
});
