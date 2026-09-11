const tmdbRequest = require("./tmdb.client");
const { normalizeMovie } = require("../utils/movie.utils");

const getMovies = async (filters = {}) => {
    const {
        page = 1,
        search,
        genre,
        year,
        minRating,
        sort = "popularity.desc",
    } = filters;

    const params = {
        language: "en-US",
        page,
        include_adult: false,
    };

    let endpoint = "/discover/movie";

    if (search) {
    endpoint = "/search/movie";

    params.query = search.trim().toLowerCase();

    } else {
        params.sort_by = sort;

        if (genre) {
            params.with_genres = genre;
        }

        if (year) {
            params.primary_release_year = year;
        }

        if (minRating !== undefined) {
            params["vote_average.gte"] = minRating;
        }
    }

    const data = await tmdbRequest(endpoint, params);

    return {
        movies: data.results.map(normalizeMovie),
        pagination: {
            page: data.page,
            totalPages: data.total_pages,
            totalResults: data.total_results,
        },
    };
};

const getGenres = async () => {
    const data = await tmdbRequest("/genre/movie/list", {
        language: "en",
    });

    return data.genres;
};

module.exports = {
    getMovies,
    getGenres,
};