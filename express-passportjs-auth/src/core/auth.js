import Passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Db from './db'

class Authentication {
  constructor() {
    console.log('Authentication Initialization.');
    this.passport = Passport;
    this.db = new Db({url:'mongodb://localhost:27017', database:'sitetraxio'});
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

  initialize() {
    this.passport.use(new LocalStrategy(this.localAuthentication.bind(this) ));
    this.passport.serializeUser(this.serializeUser);
    this.passport.deserializeUser(this.deserializeUser);
  }

  serializeUser(user, done) {
    console.log("Serializing user!");
    done(null, user.username);
  }

  deserializeUser(id, done) {
    console.log("Deserializing user!");
    done(null, {username:'vivek', password:'vivek'});
  }
}

export default Authentication;
