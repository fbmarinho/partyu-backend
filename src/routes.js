import express from "express";

const routes = express.Router();

routes.get("/", function (req, res) {
  res.status(200).send({ message: "OK" });
});

export default routes;
