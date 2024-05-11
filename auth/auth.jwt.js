const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_SAUCE;

function authenticateToken(req, res) {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, secretKey);
        return user;
    } catch (error) {
        return "Invalid Token";
    }
}

function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: "3 days" });
}


module.exports = {
    authenticateToken,
    generateToken
};
