import apiClient from "./client";

export const getMovies = async (
    params = {},
    signal
) => {
    const response = await apiClient.get("/movies", {
        params,
        signal,
    });

    return response.data;
};

export const getMovieDetails = async (
    movieId,
    signal
) => {
    const response = await apiClient.get(
        `/movies/${movieId}`,
        {
            signal,
        }
    );

    return response.data;
};

export const getGenres = async (signal) => {
    const response = await apiClient.get(
        "/movies/genres",
        {
            signal,
        }
    );

    return response.data;
};