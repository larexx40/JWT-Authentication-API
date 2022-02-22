//const { config } = require("dotenv")
const config = require('./config')
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if(!token){
        res.status(403).send("A Token is required for authentication")
    }else{
        try {
            const decoded = jwt.verify(token, config.secretKey)
            req.user= decoded
        } catch (err) {
            err = new Error("invalid token")
            err.status=401
            next(err)
        }
    }
    return next();   
};
module.exports = verifyToken