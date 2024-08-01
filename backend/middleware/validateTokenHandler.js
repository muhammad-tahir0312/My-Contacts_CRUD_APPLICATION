const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Middleware to validate JWT token

const validateToken = asyncHandler( async (req, res, next) => {
    let token;
    let AuthHeader = req.headers.authorization || req.headers.Authorization;
    if (
        AuthHeader && AuthHeader.startsWith("Bearer")
    ) {
        token = AuthHeader.split(" ")[1];
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, token is required");
    }

    try {
        const decoded = jwt.verify(token, "I am Tahir");
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token is invalid");
    }
});

module.exports = validateToken;