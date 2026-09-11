
import apiClient from "./client";

export const getWishlist = async (deviceId) => {
    const response = await apiClient.get("/wishlist", {
        params: {
            deviceId,
        },
    });

    return response.data;
};

export const addToWishlist = async (
    deviceId,
    movie
) => {
    const response = await apiClient.post("/wishlist", {
        deviceId,
        movieId: movie.id,
        title: movie.title,
        posterUrl: movie.posterUrl,
        releaseDate: movie.releaseDate,
        rating: movie.rating,
    });

    return response.data;
};

export const removeFromWishlist = async (
    deviceId,
    movieId
) => {
    const response = await apiClient.delete(
        `/wishlist/${movieId}`,
        {
            params: {
                deviceId,
            },
        }
    );

    return response.data;
};
