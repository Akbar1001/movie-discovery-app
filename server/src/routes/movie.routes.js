const express = require("express");

const movieController = require("../controllers/movie.controller");

const validate = require("../middleware/validate");
const { getMoviesSchema } = require("../middleware/movie.validation");


const router = express.Router();

router.get(
    "/",
    validate(getMoviesSchema),
    movieController.getMovies
);

router.get("/genres", movieController.getGenres);


module.exports = router; 