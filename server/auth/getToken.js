const jwt = require('jsonwebtoken');

exports.getToken = (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log('authHeader: ', authHeader)
    if (!authHeader) {
        return null;
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(authHeader, process.env.SECRET_KEY);
    }
    catch (err) {
        console.log(decodedToken)
        return null;
    }

    if (!decodedToken) {
        console.log('no token')
        return null;
    }

    return decodedToken.userId;
}