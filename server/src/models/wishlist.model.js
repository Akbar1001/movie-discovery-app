const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        deviceId: {
            type: String,
            required: true,
            index: true,
        },

        movieId: {
            type: Number,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        posterUrl: {
            type: String,
            default: null,
        },

        releaseDate: {
            type: String,
            default: null,
        },

        rating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

wishlistSchema.index(
    { deviceId: 1, movieId: 1 },
    { unique: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);