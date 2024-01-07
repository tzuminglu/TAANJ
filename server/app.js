import express from "express";
import dotenv from "dotenv";
import configRoutes from "./routes/index.js";
import cors from "cors";
import { createClient } from "redis";

dotenv.config();
const client = createClient();
const app = express();
const port = process.env.PORT || 3000

client.connect().then(() => {});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// routes for upcoming event
app.use("/admin/upcomingevent", async (req, res, next) => {
  next()
});


configRoutes(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
