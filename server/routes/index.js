import upcomingeventRoutes from "./upcomingEvent.js";
import aboutRoutes from "./about.js";
import photoRoutes from "./photos.js";
import memberRoutes from "./members.js"
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const constructorMethod = (app) => {
  app.use("/", upcomingeventRoutes);
  app.use("/", aboutRoutes);
  app.use("/", photoRoutes);
  app.use("/", memberRoutes);

  app.use("*", (req, res) => {
    // res.sendFile(
    //   path.join(__dirname, "front-end", "dist", "assets/index.html")
    // );
    res.send("fail");
  });
};

export default constructorMethod;
