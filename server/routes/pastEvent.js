import { Router, json } from "express";
import pasteventFn from "../data/pastEvent.js";
import { uploadFileToS3 } from "../aws.js";
import cors from "cors";
import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get("/pastevent", cors(), async (req, res) => {
  console.log("I'm in /pastevent");
  try {
    const pastevents = await pasteventFn.getAllPastEvent();
    res.status(200).json({ pastevents });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/admin/pastevent", cors(), async (req, res) => {
  console.log("I'm in /admin/pastevent post route");
  const newPastevent = req.body;

  try {
    const result = await pasteventFn.addPastEvent(newPastevent);
    res
      .status(200)
      .json({ result, success: "Successfully created a new past event!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post(
  "/admin/pastevent/imageupload",
  cors(),
  upload.single("image"),
  async (req, res) => {
    console.log("I'm in /admin/pastevent/imageupload");
    const { file } = req;
    const folder = "pastevent/"; // aws folder
    if (!file) return res.status(400).json({ message: "Bad request" });

    const { error, url } = await uploadFileToS3(folder, file);
    if (error) return res.status(500).json({ message: error.message });
    return res.status(200).json({ url });
  }
);

router.patch("/admin/pastevent", cors(), async (req, res) => {
  console.log("I'm in /admin/pastevent patch route");
  if (!req.body) return res.status(400).json({ message: "Bad request" });

  try {
    const pastevent = await pasteventFn.updatePastEventById(
      req.body._id,
      req.body
    );
    return res.status(200).json({ data: pastevent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/admin/pastevent", cors(), async (req, res) => {
  console.log("I'm in /admin/pastevent delete route");

  try {
    const pastevent = await pasteventFn.deletePastEventById(req.body._id);
    return res.status(200).json({ pastevent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
export default router;
