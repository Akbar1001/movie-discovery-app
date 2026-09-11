const errorHandler = (error, req, res, next) => {
    console.error("ERROR:", error);

    // Duplicate MongoDB entry
    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "This movie is already in your wishlist",
        });
    }

    // Known application / external API error
    if (error.status) {
        return res.status(error.status).json({
            success: false,
            message: error.message,
        });
    }

    // Unexpected server error
    return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
    });
};

module.exports = errorHandler;