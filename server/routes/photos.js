import { Router, json } from "express";
import photoFn from "../data/photos.js";
import { uploadFileToS3 } from "../aws.js";
import cors from "cors";
import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get("/photos", cors(), async (req, res) => {
  console.log("I'm in /photos");
  try {
    const photos = await photoFn.getAllPhotos();
    res.status(200).json({ photos });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/admin/photos", cors(), async (req, res) => {
  console.log("I'm in /admin/photos post fuinctionality");
  try {
    const photo = await photoFn.addPhoto(req.body);
    res.status(200).json({ photo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post(
  "/admin/photos/photoUpload",
  upload.any("image"),
  cors(),
  async (req, res) => {
    console.log("I'm in /admin/photos/photoUpload post fuinctionality");
    const { files } = req;
    const folder = "photos/"; // aws folder
    if (!files) return res.status(400).json({ message: "Bad request" });

    try {
      // Use Promise.all to wait for all uploads to complete
      const uploadPromises = files.map(async (file) => {
        const result = await uploadFileToS3(folder, file);
        return result.url;
      });

      const urls = await Promise.all(uploadPromises);

      return res.status(200).json({ urls });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.patch("/admin/photos", cors(), async (req, res) => {
  console.log("I'm in /admin/photos patch functionality");
  try {
    const photo = await photoFn.updatePhoto(req.body);
    res.status(200).json({ photo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/admin/photos", cors(), async (req, res) => {
  console.log("I'm in /admin/photos delete functionality");
  try {
    const photo = await photoFn.deletePhoto(req.body.id);
    res.status(200).json({ photo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
