import jwt from 'jsonwebtoken';


const requireAuth = (req, res, next) => {
    try {
        // Extract accessToken from cookies
        const token = req.cookies.accessToken;
        
        if (!token) {
            return res.status(401).json({ message: 'Authentication token is missing. Please log in.' });
        }

        // Verify and decode the access token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token. Please log in again.' });
            }

            // Attach user information to req for access in protected routes

            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export default requireAuth;