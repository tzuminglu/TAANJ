import upcomingeventRoutes from "./upcomingEvent.js";

const constructorMethod = (app) => {
  app.use("/admin", upcomingeventRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not Found" });
  });
};

export default constructorMethod;
