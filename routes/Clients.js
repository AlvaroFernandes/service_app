const express = require("express");
const clientsRouter = express.Router();

const { inputClient } = require("../controllers/ClientsController");
const { protect } = require("../middleware/authMiddleware");

clientsRouter.post("/registerclient", protect, inputClient);

module.exports = clientsRouter;
