import { Router, json } from "express";
import upcomingEventFn from "../data/upcomingEvent.js";
import { uploadFileToS3 } from "../aws.js";
import cors from "cors";
import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get("/upcomingevent", cors(), async (req, res) => {
  console.log("I'm in /upcomingevent");
  try {
    const post = await upcomingEventFn.getPostById("0");
    res.status(200).json({ post: post, success: "Successful fetch data" });
  } catch (error) {
    console.log(123, error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/admin/upcomingevent/create", cors(), async (req, res) => {
  console.log("I'm in /admin/upcomingevent/create");
  let {
    name,
    description,
    startValue,
    endValue,
    location,
    uploadImageURL,
    link1,
    link2,
  } = req.body;

  try {
    const result = await upcomingEventFn.addPost(
      name,
      description,
      startValue,
      endValue,
      location,
      uploadImageURL,
      link1,
      link2
    );
    res.status(200).json({ success: "Successfully created event!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post(
  "/admin/upcomingevent/imageupload",
  cors(),
  upload.single("image"),
  async (req, res) => {
    console.log("I'm in /admin/upcomingevent/imageupload");
    console.log(req);
    const { file } = req;
    const folder = "upcomingevent/"; // aws folder
    console.log(file);
    if (!file) return res.status(400).json({ message: "Bad request" });

    const { error, url } = await uploadFileToS3(folder, file);
    if (error) return res.status(500).json({ message: error.message });
    return res.status(200).json({ url });
  }
);

router.patch("/admin/upcomingevent/update", cors(), async (req, res) => {
  console.log("I'm in /admin/upcomingevent/update");
  let {
    name,
    description,
    startValue,
    endValue,
    location,
    uploadImageURL,
    link1,
    link2,
  } = req.body;

  try {
    const updatedPost = await upcomingEventFn.updatePost(
      name,
      description,
      startValue,
      endValue,
      location,
      uploadImageURL,
      link1,
      link2
    );
    res.status(200).json({
      updatedPost,
      success: "Test is successful",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/admin/upcomingevent/delete", cors(), async (req, res) => {
  console.log("I'm in /admin/upcomingevent/delete");
  try {
    const deletedInfo = await upcomingEventFn.deletePost();
    res.status(200).json({ deletedInfo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
