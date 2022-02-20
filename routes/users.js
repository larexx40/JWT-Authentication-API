var express = require('express');
var bcrypt = require('bcryptjs')

const config = require('../config');
const Users = require('../models/users');

var userRouter = express.Router();

/* GET users listing. */
userRouter.get('/', function(req, res, next) {
  Users.find({})
  .then((user)=>{
    res.status(200).json(user)
  }, (err)=>next(err))
  .catch((err)=>next(err))
});


userRouter.post('/login', (req, res, next)=>{

})

userRouter.post('/register', (req, res, next)=>{
  const {firstname, lastname, username, password, email} = req.body
  //validate input
  if (!(email && username && password)) {
    err = new Error('All input field required')
    err.status = 400
    return next(err)
  }
  
  //check if user exist
  Users.findOne({email})
  .then((user) => {
    if (user == null) {
      hash = bcrypt.hash(password, 10, (err, hash)=>{
        return (null, hash)
      })

      Users.create({
        username,
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: hash
      })
      .then((user)=>{
        res.status(200).json({status: "Registration Successful"})
      })
    }
    else{
      res.status(403).send("user " + email +" already exist")
    }
  }, (err)=>next(err)) 
  .catch((err)=>next(err))

})

module.exports = userRouter;
