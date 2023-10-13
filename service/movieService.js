const movieRepository = require('../Repository/movieRepository.js');

class MovieService {
    async getAllMovies(limit) {
        return await movieRepository.getAllMovies(limit);
    }

    async getMovieById(id) {
        return await movieRepository.getMovieById(id);
    }

    async createMovie(title, genres, year) {
        return await movieRepository.createMovie(title, genres, year);
    }

    async updateMovie(id, title, genres, year) {
        return await movieRepository.updateMovie(id, title, genres, year);
    }

    async deleteMovie(id) {
        return await movieRepository.deleteMovie(id);
    }

    async uploadPhoto(id, path) {
        return await movieRepository.uploadPhoto(id, path);
    }
}

module.exports = new MovieService();