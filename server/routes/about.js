import { Router, json } from "express";
import aboutFn from "../data/about.js";
import { uploadFileToS3 } from "../aws.js";
import cors from "cors";
import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
const upload = multer({ storage });

const router = Router();

// organization

router.get("/about/organization", cors(), async (req, res) => {
  console.log("I'm in /about/organization");
  try {
    const orgs = await aboutFn.getAllOrg();
    res.status(200).json({ orgs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/admin/about/organization/create", cors(), async (req, res) => {
  console.log("I'm in /admin/about/organization/create");
  const newOrg = req.body;

  try {
    const result = await aboutFn.addorg(newOrg);
    res
      .status(200)
      .json({ result, success: "Successfully created organization!" });
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

router.patch("/admin/about/organization/update", cors(), async (req, res) => {
  console.log("I'm in /admin/about/organization/update");
  if (!req.body) return res.status(400).json({ message: "Bad request" });

  try {
    const organization = await aboutFn.updateOrgById(req.body._id, req.body);
    return res.status(200).json({ organization });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/admin/about/organization/delete", cors(), async (req, res) => {
  console.log("I'm in /admin/about/organization/delete");

  try {
    const organization = await aboutFn.deleteOrgById(req.body._id);
    return res.status(200).json({ organization });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// sponsor

router.get("/about/sponsor", cors(), async (req, res) => {
  console.log("I'm in /about/sponsor");
  try {
    const sponsors = await aboutFn.getAllSponsors();
    res.status(200).json({ sponsors });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/admin/about/sponsor/create", cors(), async (req, res) => {
  console.log("I'm in /admin/about/sponsor/create");
  const newSponsor = req.body;

  try {
    const result = await aboutFn.addsponsor(newSponsor);
    res.status(200).json({ result, success: "Successfully created sponsor!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/admin/about/sponsor/update", cors(), async (req, res) => {
  console.log("I'm in /admin/about/sponsor/update");
  if (!req.body) return res.status(400).json({ message: "Bad request" });

  try {
    const sponsor = await aboutFn.updateSponsorById(req.body._id, req.body);
    return res.status(200).json({ sponsor });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/admin/about/sponsor/delete", cors(), async (req, res) => {
  console.log("I'm in /admin/about/sponsor/delete");
  if (!req.body) return res.status(400).json({ message: "Bad request" });

  try {
    const sponsor = await aboutFn.deleteSponsorById(req.body._id);
    return res.status(200).json({ sponsor });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
