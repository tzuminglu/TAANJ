import { Router, json } from "express";
const router = Router();
import axios from "axios";
import { createClient } from "redis";
const client = createClient();
client.connect().then(() => {});
import dotenv from "dotenv";
dotenv.config();


router.get("/user/login", async (req, res) => {
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

    let {email, password} = req
    


  return;
});

export default router;
