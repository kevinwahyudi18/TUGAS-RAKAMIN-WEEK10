const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../upload"));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG and PNG are allowed."), false);
    }
};

const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

module.exports = {
    upload,
};