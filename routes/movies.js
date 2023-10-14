const express = require("express");
const router = express.Router();
const moviesController = require("../controller/moviesController");
const { upload } = require("../middleware/multer.js");


router.get("/", moviesController.getAllMovies);
router.get("/:id", moviesController.getMovie);
router.post("/", moviesController.addMovie);
router.put("/:id", moviesController.updateMovie);
router.delete("/:id", moviesController.deleteMovie);
router.post("/upload/:id", upload.single("photo"), moviesController.uploadPhoto); // Gunakan fungsi dari controller


module.exports = router;