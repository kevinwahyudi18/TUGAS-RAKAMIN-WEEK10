const pool = require("../queries.js");

class Movie {
    static async getMovies(limit) {
        let query = 'SELECT * FROM movies';
        if (limit) {
            query += ` LIMIT ${parseInt(limit)}`;
        }
        return pool.query(query);
    }

    static async getMovieById(id) {
        const query = 'SELECT * FROM movies WHERE id = $1';
        return pool.query(query, [id]);
    }

    static async createMovie(title, genres, year) {
        const query = 'INSERT INTO movies (title, genres, year) VALUES ($1, $2, $3) RETURNING *';
        return await pool.query(query, [title, genres, year]);
    }

    static async updateMovieById(id, title, genres, year) {
        const query = 'UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4 RETURNING *';
        return await pool.query(query, [title, genres, year, id]);
    }

    static async deleteMovieById(id) {
        const query = 'DELETE FROM movies WHERE id = $1 RETURNING *';
        return await pool.query(query, [id]);
    }
}

module.exports = Movie;
