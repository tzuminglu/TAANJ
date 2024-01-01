import recipesRoutes from "./recipes.js";

const constructorMethod = (app) => {
  app.use("/", recipesRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not Found" });
  });
};

export default constructorMethod;
