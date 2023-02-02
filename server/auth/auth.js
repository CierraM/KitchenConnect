const jwt = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({
            message: "Not authenticated"
        })
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(authHeader, process.env.SECRET);
    }
    catch (err) {
        return res.status(500).json({
            message: "failed to confirm token"
        })
    }

    if (!decodedToken) {
        res.status(400).json({
            message: "failed to confirm token"
        })
    }

    req.userId = decodedToken.userId;

    next();

}