import { Router, json } from "express";
import axios from "axios";
import upcomingEventFn from "../data/upcomingEvent.js";
import { uploadFileToS3 } from "../aws.js";
import cors from "cors";
import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post("/upcomingevent/create", cors(), async (req, res) => {
  console.log("I'm in /admin/upcomingevent/create");
  let { name, description, startValue, endValue, location, uploadImageURL } =
    req.body;
  const newPost = await upcomingEventFn.addPost(
    name,
    description,
    startValue,
    endValue,
    location,
    uploadImageURL
  );

  res.status(200).json({ success: "Test is successful" });
});

router.post(
  "/upcomingevent/imageupload",
  cors(),
  upload.single("image"),
  async (req, res) => {
    console.log("I'm in /admin/upcomingevent/imageupload");
    const { file } = req;
    if (!file) return res.status(400).json({ message: "Bad request" });

    const { error, url } = await uploadFileToS3(file);
    if (error) return res.status(500).json({ message: error.message });
    return res.status(200).json({ url });
  }
);

export default router;
