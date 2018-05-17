"use strict";
const bCrypt = require("bcrypt-nodejs");

const generateHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8));

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
      res.status(401).json({ msg: 'Current email is already in use' });
    }
  });
};

module.exports.login = (req, res, next) => { 
  const User = req.app.get("models").User;
  User.findOne({ where: { email: req.body.email } })
  .then(authUser => {
    if(!authUser) res.status(400).json({msg: 'Current login is not registered'});
    if (bCrypt.compareSync(req.body.password, authUser.password)){
      res.status(200).json(authUser);
    } else {
      res.status(401).json({ msg: 'Incorrect password' });
    }
  }).catch(err=>{
    console.log(err);
  });
};
