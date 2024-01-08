import { Router, json } from "express";
const router = Router();
import axios from "axios";
// import { createClient } from "redis";
// const client = createClient();
// client.connect().then(() => {});

router.post("/upcomingevent/create", async (req, res) => {
  console.log("I'm in /admin/upcomingevent/create");
  let { name, description, startValue, endValue, location } = req.body;
  console.log(name, description, startValue, endValue, location)

  res.status(200).json({ success: "Test is successful" });
});

export default router;
