import Passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Db from './db'
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';

class Authentication {
  constructor() {
    console.log('Authentication Initialization.');
    this.passport = Passport;
    this.db = new Db({url:'mongodb://localhost:27017', database:'dbname'});
    this.db.connect();
  }

  localAuthentication(username, password, done) {
    console.log("[PassportJs] Authenticating using local strategy.");
    this.db.isValid(username, password, function(valid)
    {
      if (valid)
        return done(null, {username:username, password:password});
      else
        return done(null, false, { message: 'Incorrect username or password.' });
    });
  }

  googleAuthentication(token, refreshToken, profile, done) {

      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Google
    var newUser          = {};
    newUser.google = {}
    // set all of the relevant information
    newUser.image = profile.photos[0].value;
    newUser.google.id    = profile.id;
    newUser.google.token = token;
    newUser.username  = profile.displayName;
    newUser.email = profile.emails[0].value;
    console.log("Profile " + JSON.stringify(profile));
    var _this = this
    this.db.isGoogleUser(newUser, function(user) {
      console.log("User : " + user);
      if (user !== null) {
          console.log("ERR");
          // if a user is found, log them in
          return done(null, user);
      } else {
        return done(null, newUser);
      }
    });
  }

  initialize() {
    this.passport.use(new LocalStrategy(this.localAuthentication.bind(this) ));

    this.passport.use(new GoogleStrategy({
        clientID        : '948628951716-2c3vu26l7nhhdg1hkst2l7f18c5j8si5d.apps.googleusercontent.com',
        clientSecret    : '682fbhklsdsbio-YCQUrxKucez',
        callbackURL     : 'http://localhost:8080/auth/google/callback',
    }, this.googleAuthentication.bind(this)));
    this.passport.serializeUser(this.serializeUser);
    this.passport.deserializeUser(this.deserializeUser);
  }

  serializeUser(user, done) {
    console.log("Serializing user!");
    done(null, user._id);
  }

  deserializeUser(id, done) {
    console.log("Deserializing user!");
    this.db.getUserProfile(id,function(profile) {
      done(null, profile);
    });

  }
}

export default Authentication;
