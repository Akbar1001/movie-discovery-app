const express = require("express");

const movieController = require("../controllers/movie.controller");

const validate = require("../middleware/validate");

const {
    getMoviesSchema,
    movieIdSchema,
} = require("../middleware/movie.validation");


const router = express.Router();

router.get(
    "/",
    validate(getMoviesSchema),
    movieController.getMovies
);

router.get("/genres", movieController.getGenres);

router.get(
    "/:id",
    validate(movieIdSchema),
    movieController.getMovieDetails
);

module.exports = router; 