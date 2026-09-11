const Wishlist = require("../models/wishlist.model");

const getWishlist = async (req, res, next) => {
    try {
        const { deviceId } = req.validated.query;

        const wishlist = await Wishlist.find({ deviceId })
            .sort({ createdAt: -1 })
            .lean();

        res.json({
            success: true,
            data: wishlist,
        });
    } catch (error) {
        next(error);
    }
};

const addToWishlist = async (req, res, next) => {
    try {
        const {
            deviceId,
            movieId,
            title,
            posterUrl,
            releaseDate,
            rating,
        } = req.validated.body;

        const existingMovie = await Wishlist.findOne({
            deviceId,
            movieId,
        });

        if (existingMovie) {
            return res.status(409).json({
                success: false,
                message: "Movie is already in your wishlist",
            });
        }

        const wishlistMovie = await Wishlist.create({
            deviceId,
            movieId,
            title,
            posterUrl,
            releaseDate,
            rating,
        });

        res.status(201).json({
            success: true,
            data: wishlistMovie,
        });
    } catch (error) {
        next(error);
    }
};

const removeFromWishlist = async (req, res, next) => {
    try {
        const { deviceId } = req.validated.query;
        const { movieId } = req.validated.params;

        const deletedMovie = await Wishlist.findOneAndDelete({
            deviceId,
            movieId,
        });

        if (!deletedMovie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found in wishlist",
            });
        }

        res.json({
            success: true,
            message: "Movie removed from wishlist",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
};