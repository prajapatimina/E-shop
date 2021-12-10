const jwt = require('jsonwebtoken')

let ifAdmin = function auth(req, res, next) {
    const token = req.header("token")

    if(!token) return res.status(401).send('Access denied. No token provided')

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        if(req.isAdmin == true){
            next()

        }
        else{
            res.status(400).send('Permission Denied')
        }

    } catch (e) {
        res.status(400).send('Invalid token')
    }
}

let isLoggedin = function auth(req, res, next) {
    const token = req.header("token")

    if(!token) return res.status(401).send('Access denied. No token provided')

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (e) {
        res.status(400).send('Invalid token')
    }

}

module.exports={
    ifAdmin,isLoggedin
}