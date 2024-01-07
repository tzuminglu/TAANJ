import { Router, json } from "express";
const router = Router();
import axios from "axios";
import { createClient } from "redis";
const client = createClient();
client.connect().then(() => {});

router.post("/upcomingevent/create", async (req, res) => {
  console.log("I'm in /admin/upcomingevent/create");
  //   let characterList;
  //   if (await client.exists("characterList")) {
  //     characterList = await client.LRANGE("characterList", 0, 19);
  //   } else {
  //     res
  //       .status(400)
  //       .json({ error: "The cache does not contain any search characters." });
  //     return;
  //   }

  //   let characterHistoryList = await Promise.all(
  //     characterList.map(async (ele) => {
  //       let characters = JSON.parse(await client.get(`characters_${ele}`))[0];
  //       return characters;
  //     })
  //   );
  //   res.status(200).json(characterHistoryList);
  let { name, description, startValue, endValue, location } = req.body;
  console.log(name, description, startValue, endValue, location)
  // console.log(req)

  res.status(200).json({ success: "Test is successful" });
});

export default router;
