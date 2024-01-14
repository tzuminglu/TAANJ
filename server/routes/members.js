import { Router, json } from "express";
import membersFn from "../data/members.js";
import { uploadFileToS3 } from "../aws.js";
import cors from "cors";
import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get("/members", cors(), async (req, res) => {
  console.log("I'm in /members");
  try {
    const members = await membersFn.getAllMembers();
    res.status(200).json({ members });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/admin/members", cors(), async (req, res) => {
  console.log("I'm in /admin/members");
  const newOrg = req.body;

  try {
    const result = await membersFn.addMember(newOrg);
    res.status(200).json({ result, success: "Successfully created member!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post(
  "/admin/members/imageupload",
  cors(),
  upload.single("image"),
  async (req, res) => {
    console.log("I'm in /admin/members/imageupload");
    const { file } = req;
    const folder = "members/"; // aws folder
    if (!file) return res.status(400).json({ message: "Bad request" });

    const { error, url } = await uploadFileToS3(folder, file);
    if (error) return res.status(500).json({ message: error.message });
    return res.status(200).json({ url });
  }
);

router.patch("/admin/members", cors(), async (req, res) => {
  console.log("I'm in /admin/members");
  if (!req.body) return res.status(400).json({ message: "Bad request" });

  try {
    const member = await membersFn.updateMemberById(req.body._id, req.body);
    return res.status(200).json({ member });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/admin/members", cors(), async (req, res) => {
  console.log("I'm in /admin/members");

  try {
    const member = await membersFn.deleteMemberById(req.body._id);
    return res.status(200).json({ member });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
