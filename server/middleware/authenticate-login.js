var {User} = require('./../models/user');
var _ = require('lodash');
const bcrypt = require('bcryptjs');

var authenticateLogin = (req, res, next) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email,body.password).then((user) => {
      if(!user){
          return Promise.reject();
      }
      else{
        req.user = user;
        next();
      }
  }).catch((e) => {
    res.status(400).send();
  });
  // var hashedpassword;
  //   bcrypt.genSalt(10, (err, salt) => {
  //       bcrypt.hash(password, salt, (err, hash) => {
  //         hashedpassword = hash;
  //       });
  //   });
  // var user = User.findOne({
  //    email,
  // });
  // console.log(user);
  //   if (!user) {
  //     res.status(400).send();
  //   }
  //   else{
  //     req.user = user;  
  //     next();
  //   }
};

module.exports = {authenticateLogin};