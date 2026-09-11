const tmdbRequest = require("./tmdb.client");
const { normalizeMovie } = require("../utils/movie.utils");
const cache = require("../utils/cache");

const getMovies = async (filters = {}) => {
    const {
        page = 1,
        search,
        genre,
        year,
        minRating,
        sort = "popularity.desc",
    } = filters;

    const normalizedSearch = search?.trim().toLowerCase();

    const cacheKey = JSON.stringify({
        page,
        search: normalizedSearch || null,
        genre: genre || null,
        year: year || null,
        minRating: minRating ?? null,
        sort,
    });

    const cachedResult = cache.get(cacheKey);

    if (cachedResult) {
        console.log("Cache hit:", cacheKey);
        return cachedResult;
    }

    console.log("Cache miss:", cacheKey);

    const params = {
        language: "en-US",
        page,
        include_adult: false,
    };

    let endpoint = "/discover/movie";

    if (normalizedSearch) {
        endpoint = "/search/movie";
        params.query = normalizedSearch;
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

    const result = {
        movies: data.results.map(normalizeMovie),
        pagination: {
            page: data.page,
            totalPages: data.total_pages,
            totalResults: data.total_results,
        },
    };

    cache.set(cacheKey, result);

    return result;
};

const getGenres = async () => {
    const cacheKey = "movie-genres";

    const cachedGenres = cache.get(cacheKey);

    if (cachedGenres) {
        console.log("Cache hit:", cacheKey);
        return cachedGenres;
    }

    console.log("Cache miss:", cacheKey);

    const data = await tmdbRequest("/genre/movie/list", {
        language: "en",
    });

    cache.set(cacheKey, data.genres);

    return data.genres;
};


const getMovieDetails = async (movieId) => {
    const cacheKey = `movie-details:${movieId}`;

    const cachedMovie = cache.get(cacheKey);

    if (cachedMovie) {
        console.log("Cache hit:", cacheKey);
        return cachedMovie;
    }

    console.log("Cache miss:", cacheKey);

    const data = await tmdbRequest(`/movie/${movieId}`, {
        language: "en-US",
    });

    const movie = {
        id: data.id,
        title: data.title || data.original_title || "Untitled",
        overview: data.overview || "No description available.",
        posterUrl: data.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : null,
        backdropUrl: data.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`
            : null,
        rating: data.vote_average || 0,
        voteCount: data.vote_count || 0,
        releaseDate: data.release_date || null,
        runtime: data.runtime || null,
        genres: data.genres || [],
        originalLanguage: data.original_language || null,
        tagline: data.tagline || null,
        status: data.status || null,
    };

    cache.set(cacheKey, movie);

    return movie;
};

module.exports = {
    getMovies,
    getGenres,
    getMovieDetails,
};