const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const getImageUrl = (path, size = "w500") => {
    if (!path) {
        return null;
    }

    return `${IMAGE_BASE_URL}/${size}${path}`;
};

const normalizeMovie = (movie) => {
    return {
        id: movie.id,
        title: movie.title || movie.original_title || "Untitled",
        overview: movie.overview || "No description available.",
        posterUrl: getImageUrl(movie.poster_path),
        backdropUrl: getImageUrl(movie.backdrop_path, "w1280"),
        rating: movie.vote_average || 0,
        voteCount: movie.vote_count || 0,
        releaseDate: movie.release_date || null,
        popularity: movie.popularity || 0,
        genreIds: movie.genre_ids || [],
        originalLanguage: movie.original_language || null,
    };
};

module.exports = {
    normalizeMovie,
};