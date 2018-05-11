"use strict";

// This module will be executed in server.js.
const bCrypt = require("bcrypt-nodejs");
const passport = require("passport");

const { Strategy } = require("passport-local");
let User = null;

//******************** Registration authentication*************************
const RegistrationStrategy = new Strategy(
  // arg 1: declare what request (req) fields our usernameField and passwordField (passport variables) are.
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true // allows us to pass back the entire request to the callback,
    // which is particularly useful for signing up.
  },
  // arg2 callback, handle storing a user's details.
  (req, email, password, done) => {
    console.log("local strat reg callback: password", password);
    User = req.app.get("models").User; // this is made possible by line 14 in app.js: app.set('models', require('./models'));

    // add our hashed password generating function inside the callback function
    const generateHash = password => {
      let hashedWord = bCrypt.hashSync(password, bCrypt.genSaltSync(8));
      console.log('hashedWord', hashedWord);

      return hashedWord;
    };

    // using the Sequelize user model we initialized earlier as User, we check to see if the user already exists, and if not we add them.
    User.findOne({
      where: { email } // remember, this is object literal shorthand. Same as { email: email}
    }).then(user => {
      if (user) {
        console.log("user found, oops");

        return done(null, false, {
          message: "That email is already taken"
        });
      } else {
        console.log("in the else");
        const userPassword = generateHash(password); //function we defined above
        const data =
          // values come from the req.body, added by body-parser when register form request is submitted
          {
            email,
            password: userPassword,
            username: req.body.username,
          };
        // create() is a Sequelize method
        User.create(data).then(newUser => {
          if (!newUser) {
            return done(null, false);
          }
          if (newUser) {
            // console.log("newUser", newUser);
            return done(null, newUser);
          }
        });
      }
    });
  }
);

// login authentication ****************************************
//LOCAL SIGNIN
const LoginStrategy = new Strategy(
  {
    // by default, local strategy uses username and password, we will override with email
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  (req, username, password, done) => {
    User = req.app.get("models").User;

    const isValidPassword = (userpass, password) => {
      console.log('isValidPassword', userpass, password);

      // hashes the passed-in password and then compares it to the hashed password fetched from the db
      return bCrypt.compareSync(password, userpass);
    };

    User.findOne({ where: { username } })
      .then(user => {
        console.log("username stuff", user);

        if (!user) {
          return done(null, false, {
            message:
              "Can't find a user with those credentials. Please try again"
          });
        }
        if (req.body.username != user.username) {
          return done(null, false, {
            message: "Wrong username. Please try again"
          });
        }
        if (!isValidPassword(user.password, password)) {
          console.log('WRONG PASSWORD!!!');

          return done(null, false, {
            message: "Incorrect password."
          });
        }
        const userinfo = user.get(); // get returns the data about the object, separate from the rest of the instance Sequelize gives us after calling 'findOne()' above. Could also have added {raw: true} to the query to achieve the same thing

        return done(null, userinfo);
      })
      .catch(err => {
        console.log("Error:", err);
        return done(null, false, {
          message: "Something went wrong with your sign in"
        });
      });
  }
);

// Passport has to save a user ID in the session to
// manage retrieving the user details when needed.
// It achieves this with the following two methods:

//serialize. In this function, we will be saving the user id to the session in
// req.session.passport.user
passport.serializeUser((user, done) => {
  console.log("hello, serialize", user);

  // This saves the whole user obj into the session cookie,
  // but typically you will see just user.id passed in.
  done(null, user);
});

// deserialize user
// We use Sequelize's findById to get the user. Then we use the Sequelize getter function, user.get(), to pass the user data to the 'done' function as an object, stripped of the sequelize instance methods, etc.
passport.deserializeUser(({ id }, done) => {
  console.log("user arg", id);
  User.findById(id).then(user => {
    console.log("Found User in deserielize method", user.get());
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

// Take the new strategies we just created and use them as middleware, so the http requests get piped through them. A POST to register or login will trigger a strategy, because we will call passport.authenticate in the auth ctrl.
// The first argument is optional and it sets the name of the strategy.
passport.use("local-signup", RegistrationStrategy);
passport.use("local-signin", LoginStrategy);
