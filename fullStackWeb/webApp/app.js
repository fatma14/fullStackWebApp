require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const User = require("./models/User");


mongoose
  .connect("mongodb://localhost/webapp", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(session({
  secret: "cats"
}));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.originalUrl)
  next()
});

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  (username, password, done) => {
    User.findOne({
        username
      })
      .then(foundUser => {
        if (!foundUser) {
          done(null, false, {
            message: 'Incorrect username'
          });
          return;
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
          done(null, false, {
            message: 'Incorrect password'
          });
          return;
        }

        done(null, foundUser);
      })
      .catch(err => done(err));
  }
));


passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({
      username: username
    }).then(
      user => {
        if (!user) {
          return done(null, false, {
            message: 'Incorrect username.'
          });
        }

        bcrypt.compare(password, user.password).then(isPasswordCorrect => {
          if (isPasswordCorrect) {
            done(null, user);
          } else {
            done(null, false, {
              message: "Invalid credentials"
            });
          }
        })

      }
    ).catch(err => done(err));
  }

))

//GOOGLE SIGNUP
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
      passReqToCallback: true
    },
    (req, accessToken, refreshToken, profile, done) => {

      User.findOne({
          googleId: profile.id
        })
        .then(user => {
          if (user) {
            done(null, user);
          } else {
            return User.create({
              googleID: profile.id,
              name: profile.displayName
            }).then(newUser => {
              done(null, newUser);
            });
          }
        })
        .catch(err => {
          done(err);
        });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const index = require("./routes/index");
app.use("/", index);

const edit = require("./routes/editProfile")
app.use("/", edit)
module.exports = app;