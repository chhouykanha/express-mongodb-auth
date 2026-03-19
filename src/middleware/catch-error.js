// middlewares/errorHandler.js
function catchError(err, req, res, next) {
  // Handle MongoDB duplicate key error
  if (err.name === "MongoServerError" && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0] || "field";
    const value = err.keyValue[field];

    return res.status(400).json({
      error: "Duplicate key error",
      errors: {
        message: `${field} with value "${value}" already exists`
      },
    });
  }

  if (err.name === "ValidationError") {
    const errors = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });

    return res.status(400).json({
      status: "error",
      errors,
    });
  }

  // Generic error response
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    errors: {
      message: "Internal Server Error.",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    }
  });
}

module.exports = catchError;
