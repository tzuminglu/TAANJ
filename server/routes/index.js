import upcomingeventRoutes from "./upcomingEvent.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const constructorMethod = (app) => {
  app.use("/admin", upcomingeventRoutes);

  app.use("*", (req, res) => {
    // res.sendFile(
    //   path.join(__dirname, "front-end", "dist", "assets/index.html")
    // );
    res.send("fail")
  });

};

export default constructorMethod;
