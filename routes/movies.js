const express = require("express");
const router = express.Router();
const moviesController = require("../controller/moviesController");
const movieService = require("../service/movieService");
const multer = require("multer");
const { diskStorage } = require("../middleware/multer.js");

// FILE UPLOAD FILTER
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG and PNG are allowed."), false);
    }
};

const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

router.put("/upload/:id", upload.single("photo"), async (request, response) => {
    try {
        const file = request.file.path;
        const movieId = request.params.id;

        console.log(file);

        if (!file) {
            return response.status(400).send({
                status: false,
                data: "No File is Selected.",
            });
        }

        const result = await movieService.uploadPhoto(movieId, file);

        if (result.rows.length > 0) {
            response.json(result.rows[0]);
        } else {
            response.status(404).json("Not Found");
        }
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send({ status: false, message: 'Internal server error', detail: error.message });
    }
});

router.get("/", moviesController.getAllMovies);
router.get("/:id", moviesController.getMovie);
router.post("/", moviesController.addMovie);
router.put("/:id", moviesController.updateMovie);
router.delete("/:id", moviesController.deleteMovie);

// ERROR HANDLING
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        res.status(500).json({ error: "Error during file upload." });
    } else if (error) {
        res.status(500).json({ error: error.message });
    } else {
        next();
    }
});

module.exports = router;