const JWT = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).send({
                success: false,
                message: "Token is not provided",
            })
        }
        const actualtoken = token.split(" ")[1];
        JWT.verify(actualtoken, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message:"Unauthorized user",
                })
            }
            req.userId = decode.id;
            next();
        })
    } catch (error) {
        console.log(error);
        console.log(req);
        res.status(500).send({
            success: false,
            message: "Authentication failed",
            error
        })
    }
}

module.exports = authMiddleware;