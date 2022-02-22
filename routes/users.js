var express = require('express');
var bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')

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


userRouter.post('/register', (req, res, next)=>{
  const {firstname, lastname, username, password, email} = req.body
  //validate input field
  if (!(email && username && password)) {
    err = new Error('All input field required')
    err.status = 400
    return next(err)
  }
  
  //check if user exist
  Users.findOne({email})
  .then((user) => {
    if (user === null) {
      bcrypt.hash(password, 10)
      .then((hash)=>{
        Users.create({
          username,
          firstname,
          lastname,
          email: email.toLowerCase(),
          password: hash,
        })
        .then((user)=>{
          //create token
          const token = jwt.sign(
            {userId: user._id, email},
            config.secretKey, 
            {expiresIn: '2h'}
          );
          user.token = token;
          
          res.status(200).json({status: "Registration Successful", user})
        })
      }, (err)=>next(err))
      
    }
    else{
      res.status(403).send("user " + email +" already exist")
    }
  }, (err)=>next(err)) 
  .catch((err)=>next(err))
})

userRouter.post('/login', (req, res, next)=>{
  const {email, password}= req.body

  //validate user input field
  if(!(email && password)){
    res.status(403).send("All input Required")
  }

  //check if user exixt
  Users.findOne({email})
  .then((user)=>{
    if (user) {
      if(bcrypt.compareSync(password, user.password)){
        //if details is confirmed generate token
        const token = jwt.sign(
          {userId: user._id, email},
          config.secretKey,
          {expiresIn: '2h'}
        )
        user.token = token
        res.status(200).json({status: "User Logged in ", user})
      }else {
        var err = new Error("Incorrect Password")
        err.status=403
        next(err)
      }
    } else {
      res.status(200).send("User does not exist")
      
    }
  })

})
module.exports = userRouter;
