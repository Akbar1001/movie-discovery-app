const { z } = require("zod");

const deviceIdSchema = z
    .string()
    .trim()
    .min(10)
    .max(100);

const movieIdSchema = z
    .coerce
    .number()
    .int()
    .positive();

const getWishlistSchema = z.object({
    query: z.object({
        deviceId: deviceIdSchema,
    }),
});

const addWishlistSchema = z.object({
    body: z.object({
        deviceId: deviceIdSchema,

        movieId: movieIdSchema,

        title: z
            .string()
            .trim()
            .min(1)
            .max(200),

        posterUrl: z
            .string()
            .url()
            .nullable()
            .optional(),

        releaseDate: z
            .string()
            .nullable()
            .optional(),

        rating: z
            .number()
            .min(0)
            .max(10)
            .optional(),
    }),
});

const removeWishlistSchema = z.object({
    query: z.object({
        deviceId: deviceIdSchema,
    }),

    params: z.object({
        movieId: movieIdSchema,
    }),
});

module.exports = {
    getWishlistSchema,
    addWishlistSchema,
    removeWishlistSchema,
};