"use strict";
const passport = require("passport");
const bCrypt = require("bcrypt-nodejs");

const generateHash = password => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8));
};

module.exports.register = (req, res, next) => {
  const User = req.app.get("models").User;
  User.findOne({where: {email: req.body.email}})
  .then(data=>{
    if (!data){
      User.create({
        email: req.body.email,
        password: generateHash(req.body.password)
      }).then(newUser=>{
        res.status(200).json(newUser);
      });
    } else {
      console.log('bummer, its a match');
    }
  });
};

module.exports.login = (req, res, next) => { 
  const User = req.app.get("models").User;
  User.findOne({ where: { email: req.body.email } })
  .then(authUser => {
    if(!authUser) console.log('no matching user');
    if (bCrypt.compareSync(req.body.password, authUser.password)){
      res.status(200).json(authUser);
    } else {
      console.log('not a matching password');
    }
  }).catch(err=>{
    console.log(err);
  });
};
