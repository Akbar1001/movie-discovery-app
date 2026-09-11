import apiClient from "./client";

export const getMovies = async (params = {}) => {
    const response = await apiClient.get("/movies", {
        params,
    });

    return response.data;
};

export const getMovieDetails = async (movieId) => {
    const response = await apiClient.get(`/movies/${movieId}`);

    return response.data;
};

export const getGenres = async () => {
    const response = await apiClient.get("/movies/genres");

    return response.data;
};