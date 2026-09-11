const movieService = require("../services/movie.service");

const getMovies = async (req, res, next) => {
    try {
        const result = await movieService.getMovies(req.validated.query);

        res.json({
            success: true,
            data: result.movies,
            pagination: result.pagination,
        });
    } catch (error) {
        next(error);
    }
};

const getGenres = async (req, res, next) => {
    try {
        const genres = await movieService.getGenres();

        res.json({
            success: true,
            data: genres,
        });
    } catch (error) {
        next(error);
    }
};

const getMovieDetails = async (req, res, next) => {
    try {
        const { id } = req.validated.params;

        const movie = await movieService.getMovieDetails(id);

        res.json({
            success: true,
            data: movie,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMovies,
    getGenres,
    getMovieDetails,
};