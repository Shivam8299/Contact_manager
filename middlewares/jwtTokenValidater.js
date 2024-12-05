const jwt = require("jsonwebtoken")

const validateToken = async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;

    // Check if the auth header exists and starts with "Bearer"

    if (authHeader && authHeader.startsWith("Bearer")) {
        // Extract the token from the header
        token = authHeader.split(" ")[1];

        // Verify the token
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    message: "User not authorized",
                    success: false
                });
            }

            // Attach the decoded user information to the request
            req.user = decoded.user;
            next();
        });
    } 
    if(!token) {
        // If no token or invalid auth header
        return res.status(401).json({
            message: "User not authorized",
            success: false
        });
    }
};

module.exports = validateToken