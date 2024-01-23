import { Router, json } from "express";
import photoFn from "../data/photos.js";
import { uploadFileToS3 } from "../aws.js";
import cors from "cors";
import multer, { memoryStorage } from "multer";
import { createClient } from "redis";

const client = createClient();
const storage = memoryStorage();
const upload = multer({ storage });

const router = Router();

router.get("/photos", cors(), async (req, res) => {
  console.log("I'm in /photos get functionality");
  try {
    let photos = await client.get("photos");
    if (photos) {
      photos = JSON.parse(photos);
      setTimeout(() => {
        console.log("Delayed for 3 second.");
      }, "3000");

      res.status(200).json({ photos, source: "cache" });
    } else {
      photos = await photoFn.getAllPhotos();
      client.set("photos", JSON.stringify(photos));
      res.status(200).json({ photos, source: "data" });
    }
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
  upload.array("images", 10),
  cors(),
  async (req, res) => {
    console.log("I'm in /admin/photos/photoUpload post fuinctionality");
    const images = req.files;
    const folder = "photos/"; // aws folder
    if (!images) return res.status(400).json({ message: "Bad request" });

    try {
      // Use Promise.all to wait for all uploads to complete
      const uploadPromises = images.map(async (image) => {
        const result = await uploadFileToS3(folder, image);
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
