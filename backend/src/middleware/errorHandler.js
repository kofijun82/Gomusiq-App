
// Global Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    console.error("Error caught by errorHandler:", err);

    // Set the status code to 500 if not already set
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack, // Hide stack trace in production
    });
};

module.exports = errorHandler;
