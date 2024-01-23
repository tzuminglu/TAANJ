import { Router, json } from "express";
import photoFn from "../data/photos.js";
import { uploadFileToS3 } from "../aws.js";
import cors from "cors";
import multer, { memoryStorage } from "multer";
// import { createClient } from "redis";

const storage = memoryStorage();
const upload = multer({ storage });

// const host = "awesome.redis.server";
// const port = 6380;
// const client = createClient({ socket: { host, port } });

// client.on("error", (err) => console.log("Redis Client Error", err));

// await client.connect();

const router = Router();

router.get("/photos", cors(), async (req, res) => {
  console.log("I'm in /photos get functionality");
  try {
    //   let photos = await client.get("photos");
    //   if (!photos) {
    //     photos = await photoFn.getAllPhotos();
    //     client.set("photos", JSON.stringify(photos));
    //     console.log("photos from db");
    //   } else {
    //     photos = JSON.parse(photos);
    //     console.log("photos from redis");
    //   }
    let photos = await photoFn.getAllPhotos();
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
