const errorHandler = (error, req, res, next) => {
    console.error("ERROR:", error);

    if (error.status) {
        return res.status(error.status).json({
            success: false,
            message: error.message,
        });
    }

    res.status(500).json({
        success: false,
        message: error.message || "Something went wrong",
    });
};

module.exports = errorHandler;