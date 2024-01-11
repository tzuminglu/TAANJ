import { Router, json } from "express";
import aboutFn from "../data/about.js";
import { uploadFileToS3 } from "../aws.js";
import cors from "cors";
import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post("/admin/about/organization/create", cors(), async (req, res) => {
  console.log("I'm in /admin/about/organization/create");
  console.log(req.body);
  const newOrg = req.body;

  try {
    const result = await aboutFn.addorg(newOrg);
    res.status(200).json({ result, success: "Successfully created event!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post(
  "/admin/about/organization/imageupload",
  cors(),
  upload.single("image"),
  async (req, res) => {
    console.log("I'm in /admin/about/organization/imageupload");
    const { file } = req;
    const folder = "about/"; // aws folder
    if (!file) return res.status(400).json({ message: "Bad request" });

    const { error, url } = await uploadFileToS3(folder, file);
    if (error) return res.status(500).json({ message: error.message });
    return res.status(200).json({ url });
  }
);

export default router;
