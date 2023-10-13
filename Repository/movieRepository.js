const pool = require("../queries.js");

class MovieRepository {
    async getAllMovies(limit) {
        let query = 'SELECT * FROM movies';
        if (limit) {
            query += ` LIMIT ${parseInt(limit)}`;
        }
        return pool.query(query);
    };

    async getMovieById(id) {
        const query = 'SELECT * FROM movies WHERE id = $1';
        return pool.query(query, [id]);
    };

    async createMovie(title, genres, year) {
        const query = 'INSERT INTO movies (title, genres, year) VALUES ($1, $2, $3) RETURNING *';
        return await pool.query(query, [title, genres, year]);
    };

    async updateMovie(id, title, genres, year) {
        const query = 'UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4 RETURNING *';
        return await pool.query(query, [title, genres, year, id]);
    };

    async deleteMovie(id) {
        const query = 'DELETE FROM movies WHERE id = $1 RETURNING *';
        return await pool.query(query, [id]);
    };

    async uploadPhoto(id, path) {
        const query = 'UPDATE movies SET photo = $1 WHERE id = $2 RETURNING *';
        return await pool.query(query, [path, id]);
    };
}

module.exports = new MovieRepository();