const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse({
            query: req.query,
            params: req.params,
            body: req.body,
        });

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid request parameters",
                errors: result.error.issues,
            });
        }

        req.validated = result.data;
        next();
    };
};

module.exports = validate;