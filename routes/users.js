const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController.js");

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUserById);

module.exports = router;