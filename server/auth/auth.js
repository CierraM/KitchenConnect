const jwt = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
    console.log('authenticating...')
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({
            message: "Not authenticated"
        })
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(authHeader, process.env.SECRET_KEY);
    }
    catch (err) {
        console.log(err)
        return res.status(403).json({
            message: "failed to confirm token"
        })
    }

    if (!decodedToken) {
        console.log('no token')
        res.status(403).json({
            message: "failed to confirm token"
        })
    }

    req.userId = decodedToken.userId;
    console.log("userid: ", req.userId)

    next();

}