const { z } = require("zod");

const getMoviesSchema = z.object({
    query: z.object({
        page: z.coerce
            .number()
            .int()
            .min(1)
            .default(1),

        search: z
            .string()
            .trim()
            .min(1)
            .max(100)
            .optional(),

        genre: z.coerce
            .number()
            .int()
            .positive()
            .optional(),

        year: z.coerce
            .number()
            .int()
            .min(1900)
            .max(2100)
            .optional(),

        minRating: z.coerce
            .number()
            .min(0)
            .max(10)
            .optional(),

        sort: z
            .enum([
                "popularity.desc",
                "popularity.asc",
                "vote_average.desc",
                "vote_average.asc",
                "primary_release_date.desc",
                "primary_release_date.asc",
                "title.asc",
                "title.desc",
            ])
            .default("popularity.desc"),
    }),
});

const movieIdSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive(),
    }),
});

module.exports = {
    getMoviesSchema,
    movieIdSchema,
};