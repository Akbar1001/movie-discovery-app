const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const movieRoutes = require("./routes/movie.routes");
const wishlistRoutes = require("./routes/wishlist.routes");

const errorHandler = require("./middleware/errorHandler");
const apiLimiter = require("./middleware/rateLimiter");

const app = express();

const allowedOrigin =
    process.env.CLIENT_URL || "http://localhost:5173";

app.use(helmet());

app.use(
    cors({
        origin: allowedOrigin,
    })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Movie API is running",
    });
});

app.use("/api", apiLimiter);

app.use("/api/movies", movieRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.use(errorHandler);

module.exports = app;