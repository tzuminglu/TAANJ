import upcomingeventRoutes from "./upcomingEvent.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const constructorMethod = (app) => {
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/front-end/build/index.html"));
  });

  app.use("/admin", upcomingeventRoutes);
};

export default constructorMethod;
