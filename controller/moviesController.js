const movieService = require("../service/movieService.js");

const getAllMovies = async (req, res) => {
    try {
        const limit = req.query.limit;
        const result = await movieService.getAllMovies(limit);
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json("Internal Server Error");
    }
};

const getMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await movieModel.getMovieById(id);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json("Not Found");
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json("Internal Server Error");
    }
};

const addMovie = async (req, res) => {
    try {
        const { title, genres, year } = req.body;
        const result = await movieModel.createMovie(title, genres, year);
        res.status(201).json({ message: 'Data berhasil dimasukkan ke dalam database', insertedData: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, genres, year } = req.body;
        const result = await movieModel.updateMovieById(id, title, genres, year);
        
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json("Not Found");
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json("Internal Server Error");
    }
};

const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await movieModel.deleteMovieById(id);

        if (result.rows.length > 0) {
            res.json({ message: 'Film berhasil dihapus', deletedFilm: result.rows[0] });
        } else {
            res.status(404).json("Not Found");
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json("Internal Server Error");
    }
};


module.exports = {
    getAllMovies,
    getMovie,
    addMovie,
    updateMovie,
    deleteMovie
};